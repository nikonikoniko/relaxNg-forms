/* eslint-disable no-unused-vars */
// matches.js

const { matches } = require('z');
const {
  get,
} = require('lodash/fp');

const {
  definition,
  namedElement,
} = require('../definitions.js');


// destructure the domparser data structure FROM html form TO valid xml
// as described by schema
export const map = (node) =>
  matches(node).call(
    {definition, namedElement},
    (x = definition) => '',
    (x = namedElement) => get('attributes.0.value', x),
    (x) => ''
  );

export default {
  map,
};
