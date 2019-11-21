/* eslint-disable no-unused-vars */
const {
  get,
  find,
  values,
  compact,
  tail,
  map,
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
    const attributes = tail(node.attributes)
    const attributeStr = map(x => `${x.name}="${x.value}"`);
    const attrs = attributeStr(attributes);
    return `<${elname} ${attrs}>${inject.join('')}</${elname}>`;
  },
  formfield: (node, inject) => {
    const val = node.value || '';
    return `${val}`;
  },
  zeroOrMore: (node, inject) => {
    console.log(compact(inject));
    return tail(compact(inject)).join('');
  },
  attribute: (node, inject) => {
    const n = nodeName(node);
    const v = get('children.0.value', node);
    node.parentNode.setAttribute(n, v);
    return '';
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
