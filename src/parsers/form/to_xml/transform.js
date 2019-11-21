/* eslint-disable no-unused-vars */
const {
  get,
  find,
  values,
  tail,
} = require('lodash/fp');

const {
  nodeName,
  isZeroOrMore,
  tagName,
  choiceValue,
  inputName,
} = require('../elements.js');

const funks = {
  namedElement: (node, inject) => {
    const elname = nodeName(node);
    return `<${elname}>${inject.join('')}</${elname}>`;
  },
  formfield: (node, inject) => {
    const val = node.value || '';
    return `${val}`;
  },
  zeroOrMore: (node, inject) => {
    return tail(inject).join('');
  },
  nothing: (node, inject) =>
    inject.join(''),
  default: (node, inject) => {
    console.log([node]);
    console.log(node.tagName);
    console.error(`above nnode element "${node.tagName}" NOT FOUND in definitions!!!!`);
    const val = node.value || '';
    return inject.join('');
  },
};

module.exports = funks;
