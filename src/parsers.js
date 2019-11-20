const {
  walkDOMUp,
  walkDOMDown,
} = require('./walkers.js');

const {mapForm} = require('./mappers/relaxToForm.js');
const {mapDot} = require('./mappers/relaxToDotPath.js');


const transformRngToDot = (node, parents) => {
  const repr = mapDot(node);
  return repr ? `${parents}.${repr}` : parents;
};

const transformRngToNode = (node, inject) => {
  const transformFunction = mapForm(node);
  return transformFunction(node, inject);
};

const parseRng = walkDOMDown(transformRngToNode);
const parseDotPath = walkDOMUp(transformRngToDot);

module.exports = {
  parseDotPath,
  parseRng,
};
