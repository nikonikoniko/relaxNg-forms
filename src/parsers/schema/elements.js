
/* eslint-disable no-unused-vars */
const {
  get,
  filter,
  first,
} = require('lodash/fp');

const {matches} = require('z');
const definitions = require('./definitions.js');

const nodeName = get('attributes.0.value');

const tagName = get('tagName');

const firstElementChild = x => first(filter(get('tagName'), x.childNodes));

const choiceValue = get('childNodes.0.nodeValue');

const inputName = (node) => {
  const {parseSchema} = require('./to_dotnotation/index.js'); // eslint-disable-line
  const dotpath = parseSchema;
  // the above require must be there otherwise there is a circular
  // dependency.  since the whole lib is recursive by nature, we need it.
  return dotpath(node);
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
  firstElementChild,
};
