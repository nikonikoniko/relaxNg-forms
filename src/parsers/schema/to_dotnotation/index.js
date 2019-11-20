const {
  walkDOMUp,
} = require('../../walkers.js');

const {map} = require('./mapper.js');


const transform = (node, parents) => {
  const repr = map(node);
  return repr ? `${parents}.${repr}` : parents;
};

export const parseSchema = walkDOMUp(transform);

export default {
  parseSchema,
};
