const {
  walkDOMDown,
} = require('../../walkers.js');

import {map} from './mapper.js';

const transform = (node, inject) => {
  const transformNode = map(node);
  return transformNode(node, inject);
};

export const parseSchema = walkDOMDown(transform);

export default {
  parseSchema,
};
