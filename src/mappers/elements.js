
/* eslint-disable no-unused-vars */
const {
  get,
} = require('lodash/fp');

const {matches} = require('z');
const definitions = require('../mappers/definitions.js');

const nodeName = get('attributes.0.value');

const tagName = get('tagName');

const choiceValue = get('childNodes.0.nodeValue');

const inputName = (node) => {
  const {
    parseDotPath,
    parseRng,
  } = require('../parsers.js'); // eslint-disable-line
  // the above require must be there otherwise there is a circular
  // dependency.  since the whole lib is recursive by nature, we need it.
  return parseDotPath(node);
};

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
  inputName,
};
