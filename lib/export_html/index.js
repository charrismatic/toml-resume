var fs = require('fs')

module.exports = function (resume, options) {
  var export_file = `${__dirname}/../../${options.export_dir}/${options.export_file}`

  fs.open(export_file, 'w', (err, fd) => {
    if (err) {
      console.log('export error', err, fd)
    }

    console.log(`Saving as html file: ${options.export_dir}/${options.export_file}`)
    fs.writeFileSync(export_file, resume)
  })
}
