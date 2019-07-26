var fs = require('fs')
var path = require('path')
var Handlebars = require('handlebars')

var dirs = {
  assets: 'assets',
  styles: 'css',
  scripts: 'js',
  templates: 'templates',
  partials: 'partials',
  blocks: 'blocks'
}

var paths = {
  base: [__dirname, '/..'].join(''),
  styles: `${dirs.assets}/${dirs.styles}`,
  scripts: `${dirs.assets}/${dirs.scripts}`,
  blocks: `${dirs.templates}/${dirs.blocks}`,
  partials: `${dirs.templates}/${dirs.partials}`,
  templates: `${dirs.templates}`
}

Handlebars.registerHelper('markdown', function () {
  // var markup = markdown().apply(this, arguments)
  // var startEndMatch = markup.match(/^<p>(.*)<\/p>\n$/)
  // return startEndMatch &&
  //     startEndMatch[1].indexOf('<p>') === -1 ? startEndMatch[1] : markup
  return ''
})

Handlebars.registerHelper('displayUrl', function (str) {
  return str.replace(/https?:\/\//, '')
})

Handlebars.registerHelper('toLowerCase', function (str) {
  return str.toLowerCase()
})

Handlebars.registerHelper('year', function (str) {
  if (str === 'hidden') {
    return ''
  } else if (str) {
    var d = new Date(str)
    return d.getFullYear()
  } else {
    return 'Present'
  }
})

Handlebars.registerHelper('award', function (str) {
  switch (str.toLowerCase()) {
    case 'bachelor':
    case 'master': return str + 's'
    default: return str
  }
})

Handlebars.registerHelper('skillLevel', function (str) {
  var level = str.toString().toLowerCase().trim()
  var output = ''

  if (/[a-z]/.test(level)) {
    switch (level) {
      case 'none':
        output = '0%'
        break
      case 'low':
      case 'beginner':
        output = '25%'
        break
      case 'medium':
      case 'intermediate':
        output = '50%'
        break
      case 'high':
      case 'advanced':
        output = '75%'
        break
      case 'very-high':
      case 'master':
        output = '100%'
        break
      default:
        output = '1%'
    }
  } else if (/^[012345]$/.test(level)) {
    // 1 to 5 | NONE, LOW, MEDIUM, HIGH, VERY-HIGH
    var prct = (parseInt(level) / 5 * 100)
    output = `${prct}%`
  } else if (/[%]/.test(level)) {
    // PERCENTAGE
    output = level
  } else if (/^[0-9]+$/.test(level)) {
    // NUMBER VALUE
    output = level + '%'
  } else {
    // UNKNOWN
    output = '0%'
  }
  return output
})

function debug_log (input) {
  if (process.env.RESUME_ENV_DEBUG) {
    console.log(input)
  }
}

module.exports = function (resume) {
  debug_log(resume)

  var template_partials = fs.readdirSync(paths.partials)

  debug_log('[template_partials]')
  debug_log(template_partials)

  var template_blocks = fs.readdirSync(paths.blocks)

  debug_log('[template_blocks]')
  debug_log(template_blocks)

  template_blocks.forEach(function (block_file) {
    var matches = /^([^.]+).hbs$/.exec(block_file)
    if (!matches) { return }
    var block_name = matches[1]
    var block_path = path.join(paths.blocks, block_file)
    var block_template = fs.readFileSync(block_path, 'utf8')
    Handlebars.registerPartial(block_name, block_template)
  })

  template_partials.forEach(function (partial_file) {
    var matches = /^([^.]+).hbs$/.exec(partial_file)
    if (!matches) { return }
    var partial_name = matches[1]
    var partial_path = path.join(paths.partials, partial_file)
    var partial_template = fs.readFileSync(partial_path, 'utf8')
    Handlebars.registerPartial(partial_name, partial_template)
  })


  // var css = fs.readFileSync(`${paths.base}/${paths.styles}/page-styles.css`, 'utf-8')
  var css = fs.readFileSync(`${paths.base}/./embedded/styles/page-styles.css`, 'utf-8')
  var paper_style = fs.readFileSync(`${paths.base}/./embedded/styles/paper.css`, 'utf-8')

  // var js = fs.readFileSync(`${paths.base}/${paths.scripts}/page-scripts.js`, 'utf-8')
  var js = fs.readFileSync(`${paths.base}/./embedded/scripts/page-scripts.js`, 'utf-8')
  debug_log(js)

  var template = fs.readFileSync(`${paths.base}/../${paths.templates}/resume.hbs`, 'utf-8')
  debug_log(template)

  return Handlebars.compile(template)({
    paperStyle: paper_style,
    css: css,
    js: js,
    resume: resume
  })
}
