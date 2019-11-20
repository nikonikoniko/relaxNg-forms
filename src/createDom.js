
const {DOMParser} = require('xmldom');

const convert = xmlStr => {
  const parser = new DOMParser();
  const document = parser.parseFromString(xmlStr);
  return document.getElementsByTagName('start')[0];
};

module.exports =  {
  convert,
};
