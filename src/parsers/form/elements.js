
/* eslint-disable no-unused-vars */
const {
  get,
} = require('lodash/fp');

const {matches} = require('z');
const definitions = require('./definitions.js');

const nodeName = get('attributes.0.value');

const tagName = get('tagName');

const choiceValue = get('childNodes.0.nodeValue');

const isZeroOrMore = node => matches(node).call(
  {definitions},
  (x = definitions.zeroOrMore) => true,
  (x) => false
);
module.exports = {
  nodeName,
  isZeroOrMore,
  tagName,
  choiceValue,
};
