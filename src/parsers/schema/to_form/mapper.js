/* eslint-disable no-unused-vars */
// matches.js

const { matches } = require('z');
const transforms = require('./transform.js');
const definitions = require('../definitions.js');

// destructure the domparser data structure FROM schema.rng form TO valid html form
// as described by schema
export const map = (node) =>
  matches(node).call(
    {definitions}, // z requires vars in matches to be explicitly passed to the context
    (x = definitions.definition) => transforms.define,
    (x = definitions.namedElement) => transforms.namedElement,
    (x = definitions.element) => transforms.element,
    (x = definitions.oneOrMore) => transforms.oneOrMore,
    (x = definitions.zeroOrMore) => transforms.zeroOrMore,
    (x = definitions.optional) => transforms.optional,
    (x = {
      tagName: 'text',
    }) => transforms.text,
    (x = definitions.ref) => transforms.ref,
    (x = definitions.list) => transforms.list,
    (x = definitions.choice) => transforms.choice,
    (x = definitions.value) => transforms.value,
    (x = definitions.input) => transforms.input,
    (x = definitions.decimal) => transforms.decimal,
    (x = definitions.int) => transforms.int,
    (x = definitions.token) => transforms.input,
    (x = definitions.attribute) => transforms.attribute,
    (x) => transforms.default
  );

export default {
  map,
};
