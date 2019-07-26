var fs = require('fs');
var Handlebars = require('handlebars')
var path = require('path');

function resumeToMd(resume) {
  var template = fs.readFileSync(path.resolve(__dirname, './layout.md.hbs'), 'utf8');
  return Handlebars.compile(template)({resume})
}

module.exports = resumeToMd;
