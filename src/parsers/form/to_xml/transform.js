/* eslint-disable no-unused-vars */
const {
  get,
  find,
  values,
} = require('lodash/fp');

const {
  nodeName,
  isOptionalNode,
  tagName,
  choiceValue,
  inputName,
} = require('../elements.js');

const funks = {
  namedElement: (node, inject) => {
    const elname = nodeName(node);
    return `<${elname}>${inject.join('\n')}</${elname}>\n`;
  },
  formfield: (node, inject) => {
    const val = node.value || '';
    return `${val}\n`;
  },
  default: (node, inject) => {
    console.log([node]);
    console.log(node.tagName);
    console.error(`above nnode element "${node.tagName}" NOT FOUND in definitions!!!!`);
    const val = node.value || '';
    return inject.join('\n');
  },
};

module.exports = funks;
