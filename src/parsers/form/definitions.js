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
  oneOrMore: {
    tagName: 'oneOrMore',
  },
  zeroOrMore: {
    tagName: 'zeroOrMore',
  },
  optional: {
    tagName: 'optional',
  },
  text: {
    tagName: 'text',
  },
  ref: {
    tagName: 'ref',
  },
  list: {
    tagName: 'list',
  },
  choice: {
    tagName: 'choice',
  },
  value: {
    tagName: 'value',
  },
  input: {
    tagName: 'data',
    attributes: {
      0: {
        name: 'type',
        value: 'Name',
      },
    },
  },
  decimal: {
    tagName: 'data',
    attributes: {
      0: {
        name: 'type',
        value: 'decimal',
      },
    },
  },
  int: {
    tagName: 'data',
    attributes: {
      0: {
        name: 'type',
        value: 'int',
      },
    },
  },
  token: {
    tagName: 'data',
    attributes: {
      0: {
        name: 'type',
        value: 'token',
      },
    },
  },
  attribute: {
    tagName: 'attribute',
  },
  default: {},
};

module.exports = definitions;
