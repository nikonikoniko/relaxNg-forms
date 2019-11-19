/* eslint-disable no-unused-vars */
const {
  get,
  find,
  values,
} = require('lodash/fp');

const {matches} = require('z');
const definitions = require('./definitions.js');

const nodeName = get('attributes.0.value');
const optional = node => matches(node).call(
  {definitions},
  (x = definitions.optional) => true,
  (x) => false
);

const funks = {
  define: (node, inject) =>
    inject.join('<br />')
  ,
  product: (node, inject) =>
    `<h1>omg we have a product</h1><product>${inject.join('<br />')}</product>`
  ,
  element: (node, inject) =>
    `<element>${inject.join('<br />')}</element>`
  ,
  oneOrMore: (node, inject) =>
    `<oneOrMore> one or more of: <br /> ${inject.join('<br />')}</oneOrMore>` // functionality for this
  ,
  zeroOrMore: (node, inject) =>
    `<zeroOrMore> zero or more of: <br /> ${inject.join('<br />')}</zeroOrMore>` // functionality for this
  ,
  optional: (node, inject) =>
    `<optional>${inject.join('<br />')}</optional>`
  ,
  text: (node, inject) =>
    `<textarea class='form-control'>${inject.join('<br />')}</textarea>`
  ,
  ref: (node, inject) => {
    const refFor = nodeName(node);
    const dom = node.ownerDocument;
    const defs = values(dom.getElementsByTagName('define'));
    const definition = find(x => get('attributes.0.value', x) === refFor, defs);
    if (!definition) return `<h5>REF NOT FOUND FOR ${refFor}</h5>`;
    const {
      parseDotPath,
      parseRng,
    } = require('./parsers.js'); // eslint-disable-line
    // the above require must be there otherwise there is a circular
    // dependency.  since the whole lib is recursive by nature, we need it.
    return `<ref> <h4>${refFor}</h4> <br /> ${parseRng(definition)} </ref>`;
  },
  input: (node, inject) => {
    const opt = optional(node.parentNode.parentNode);
    return `${opt ? 'i am optional!!!' : 'required'}<input type='text' class='form-control'>${inject.join('<br />')}</input>`;
  },
  decimal: (node, inject) =>
    `<input class='form-control' name=opacity type=number min=0 max=1 step=0.01></input>${inject.join('<br />')}`
  ,
  int: (node, inject) =>
    `<input type=number class='form-control'>${inject.join('<br />')}</input`
  ,
  list: (node, inject) =>
    `<select class='form-control'>${inject.join('<br />')}</select>`
  ,
  choice: (node, inject) =>
    inject.join('/n')
  ,
  value: (node, inject) => {
    const choiceVal = get('childNodes.0.nodeValue', node);
    return `<option value='${choiceVal}'>${choiceVal}</option>`;
  },
  namedElement: (node, inject) => {
    const elname = get('attributes.0.value', node);
    return `<${elname}>${elname}<br />${inject.join('<br />')}</${elname}>`;
  },
  attribute: (node, inject) => {
    const elname = get('attributes.0.value', node);
    return `<attribute>${elname} - ${inject.join('<br />')}</attribute>`;
  },
  default: (node, inject) => {
    console.log(node);
    console.log(node.tagName);
    console.error(`above node element ${node.tagName} NOT FOUND in definitions!!!!`);
    return `<<?>>${inject.join('<br />')}`;
  },
};

module.exports = funks;
