// this file contains the forms of data used to identify what node is
// they will be fed in to the z parrern matching library.
// thought of as: "if a node has these elements in this format, then it is a [key]"

const definitions = {
  definition: {
    tagName: 'define',
  },
  // as an example: if a node has a tagname of 'element' and attr 'name'
  // then we define it as a namedElement
  namedElement: {
    tagName: 'ELEMENT',
    attributes: {
      0: {
        name: 'name',
      },
    },
  },
  textarea: {
    tagName: 'TEXTAREA',
  },
  input: {
    tagName: 'INPUT',
  },
  select: {
    tagName: 'SELECT',
  },
  default: {},
};

module.exports = definitions;
