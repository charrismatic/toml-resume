module.exports = function(resume_file) {
  const toml = require('toml');
  const fs = require('fs');
  let resume_text_buf = fs.readFileSync(resume_file);
  let resume_text = Buffer.from(resume_text_buf).toString('utf-8');

  try {
    var resume_data = toml.parse(resume_text);
  } catch (e) {
    console.error('Parsing error on line ' + e.line + ', column ' + e.column + ': ' + e.message);
  }
  return resume_data;
};
