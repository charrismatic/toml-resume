module.exports = function(resume_file) {
  var fs = require('fs');
  var resume_text_buf = fs.readFileSync(resume_file);
  var resume_text = Buffer.from(resume_text_buf).toString('utf-8');
  // console.log(resume_text);
  return resume_text;
};
