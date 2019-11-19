
/* eslint-disable no-unused-vars */
const {
  get,
} = require('lodash/fp');

const {matches} = require('z');
const definitions = require('../mappers/definitions.js');

const nodeName = get('attributes.0.value');

const tagName = get('tagName');

const choiceValue = get('childNodes.0.nodeValue');

const isOptionalNode = node => matches(node).call(
  {definitions},
  (x = definitions.optional) => true,
  (x) => false
);
module.exports = {
  nodeName,
  isOptionalNode,
  tagName,
  choiceValue,
};
