
const {
  DOMParser,
} = require('xmldom');

const convert = xmlStr => {
  const parser = new DOMParser();
  const document = parser.parseFromString(xmlStr);
  const start = document.getElementsByTagName('start')[0];
  return start || document.firstChild;
};

module.exports =  {
  convert,
};
