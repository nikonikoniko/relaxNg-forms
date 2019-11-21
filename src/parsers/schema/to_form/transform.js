/* eslint-disable no-unused-vars */
const {
  get,
  find,
  values,
  first,
} = require('lodash/fp');

const {
  nodeName,
  isOptionalNode,
  tagName,
  choiceValue,
  inputName,
  firstElementChild,
} = require('../elements.js');

// TODO: replacing all of these with react/jsx components would be incredible
// hyper simple DOM manipulation works for now

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
  clonable: (name) => {
    return `<button
     type="button"
     class="btn btn-primary"
     onclick="console.log(this.previousSibling);this.parentNode.insertBefore(this.previousSibling.cloneNode(true), this)"
    >
     add ${name}
    </button>`;
  },
  oneOrMore: (node, inject) => {
    const n = nodeName(firstElementChild(node));
    return `one or more of: <br /> <oneOrMore> ${inject.join('<br />')}${funks.clonable(n)}</oneOrMore>` // functionality for this
  },
  zeroOrMore: (node, inject) => {
    const n = nodeName(firstElementChild(node));
    return `zero or more of: <br /> <zeroOrMore>${inject.join('<br />')}${funks.clonable(n)}</zeroOrMore>` // functionality for this
  },
  optional: (node, inject) =>
    `<optional>${inject.join('<br />')}</optional>`
  ,
  text: (node, inject) => {
    const opt = isOptionalNode(node.parentNode.parentNode);
    return `<textarea class='form-control' ${!opt ? 'required' : ''} name='${inputName(node)}'>${inject.join('<br />')}</textarea>`;
  },
  ref: (node, inject) => {
    const refFor = nodeName(node);
    const dom = node.ownerDocument;
    const defs = values(dom.getElementsByTagName('define'));
    const definition = find(x => get('attributes.0.value', x) === refFor, defs);
    if (!definition) return `<h5>REF NOT FOUND FOR ${refFor}</h5>`;
    const {parseSchema} = require('./index.js'); // eslint-disable-line
    // the above require must be there otherwise there is a circular
    // dependency.  since the whole lib is recursive by nature, we need it.
    return `<ref> <h4>${refFor}</h4> <br /> ${parseSchema(definition)} </ref>`;
  },
  input: (node, inject) => {
    const opt = isOptionalNode(node.parentNode.parentNode);
    return `<input type='text' required=${!opt} class='form-control'>${inject.join('<br />')}</input>`;
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
    const choiceVal = choiceValue(node);
    return `<option value='${choiceVal}'>${choiceVal}</option>`;
  },
  namedElement: (node, inject) => {
    const elname = nodeName(node);
    return `<element name='${elname}'>${elname}<br />${inject.join('<br />')}</element>`;
  },
  attribute: (node, inject) => {
    const elname = nodeName(node);
    return `<attribute>${elname} - ${inject.join('<br />')}</attribute>`;
  },
  default: (node, inject) => {
    console.log(node);
    console.log(node.tagName);
    console.error(`above node element "${node.tagName}" NOT FOUND in definitions!!!!`);
    return `<<?>>${inject.join('<br />')}`;
  },
};

module.exports = funks;
