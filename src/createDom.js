
const {
  DOMParser,
  DOMImplementation,
} = require('xmldom');

const convert = xmlStr => {
  const parser = new DOMParser();
  const document = parser.parseFromString(xmlStr);
  const start = document.getElementsByTagName('start')[0];
  return start || document.firstChild;
};

const create = () => {
  const doc = document.implementation.createDocument("", "", null);
  console.log(doc);
  console.log('fuuuuuuuuuu');
  return doc;
};

module.exports =  {
  convert,
  create,
};
