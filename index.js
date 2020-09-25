#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2), {
  string: [ 'format' ],
});


const renderHtml = require('./lib/render_html')
const renderTxt = require('./lib/render_txt')
const renderMd = require('./lib/render_md')

const exportHtml = require('./lib/export_html')
const exportTxt = require('./lib/export_txt')
const exportMd = require('./lib/export_md')

var resume
var options
var rendered

function debug_log (input) {
  if (process.env.RESUME_ENV_DEBUG) {
    console.log(input)
  }
}

// MERGE USER OPTIONS AND DEFAULT
const parse_options = () => {
  var defaults = {
    input: false,
    debug: true,
    verbose: false,
    log_file: '.resume_build.log',
    livereload: false,
    console_output: false,
    resume_dir: 'data',
    resume_format: 'toml',
    resume_file: 'resume.toml',
    export_dir: './.public',
    export_file: 'index.html',
    format: 'html'
  }

  var runtime_options = process.env.RESUME_ENV
  if (runtime_options) {
    debug_log('With options')
    debug_log(runtime_options)
  } else {
    runtime_options = '{}'
  }

  options = Object.assign(
    Object.create(null),
    defaults,
    JSON.parse(runtime_options),
    argv
  )

  if (options.format === 'md') {
    options.export_file = 'resume.md'
  }

  if (options.debug) {
    debug_log('Process env:')
    debug_log(process.env.RESUME_ENV)
    debug_log(options)
  }
}

parse_options()

var resume_path = `${__dirname}/${options.resume_dir}/${options.resume_file}`

console.log(`Reading resume source: ${options.resume_dir}/${options.resume_file}`)

if (options.resume_format === 'json') {
  resume = require(resume_path)
} else if (options.resume_format === 'toml') {
  resume = require('./lib/parse_toml')(resume_path)
} else {
  resume = require('./lib/parse_text')(resume_path)
}

debug_log(resume)

function main(){
  if (options.format === 'html') {
    rendered = renderHtml(resume)
    exportHtml(rendered, options)
  }

  else if (options.format === 'md') {
    rendered = renderMd(resume)
    exportMd(rendered, options)
  }

  else if (options.format === 'txt') {
    rendered = renderTxt(resume)
    exportTxt(rendered, options)
  }

  if (options.console_output) console.log(rendered)
  debug_log(options)
}

main()
