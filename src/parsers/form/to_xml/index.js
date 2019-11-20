import {map} from './mapper';

const {
  walkDOMDown,
} = require('../../walkers.js');


const transform = (node, inject) => {
  const transformNode = map(node);
  return transformNode(node, inject);
};

export const parseSchema = walkDOMDown(transform);

export default {
  parseSchema,
};
