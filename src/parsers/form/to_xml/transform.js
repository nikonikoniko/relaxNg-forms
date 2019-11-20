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
  default: (node, inject) => {
    console.log(node);
    console.log(node.tagName);
    console.error(`above node element "${node.tagName}" NOT FOUND in definitions!!!!`);
    return `<<?>>${inject.join('<br />')}`;
  },
};

module.exports = funks;
