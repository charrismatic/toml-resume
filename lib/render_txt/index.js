var fs = require('fs');
var Handlebars = require('handlebars')
var path = require('path');

function resumeToTxt(resume) {
  var template = fs.readFileSync(path.resolve(__dirname, './layout.txt.hbs'), 'utf8');
  return Handlebars.compile(template)({resume})
}

module.exports = resumeToTxt;
