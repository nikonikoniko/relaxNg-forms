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
    (x = definitions.attribute) => transforms.attribute,
    (x) => transforms.default
  );

export default {
  map,
};
