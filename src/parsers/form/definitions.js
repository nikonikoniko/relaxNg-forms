// this file contains the forms of data used to identify what node is
// they will be fed in to the z parrern matching library.
// thought of as: "if a node has these elements in this format, then it is a [key]"

const definitions = {
  attribute: {
    tagName: 'ATTRIBUTE',
  },
  br: {
    tagName: 'BR',
  },
  div: {
    tagName: 'DIV',
  },
  oneOrMore: {
    tagName: 'ONEORMORE',
  },
  button: {
    tagName: 'BUTTON',
  },
  optional: {
    tagName: 'OPTIONAL',
  },
  form: {
    tagName: 'FORM',
  },
  h4: {
    tagName: 'H4',
  },
  h5: {
    tagName: 'H5',
  },
  option: {
    tagName: 'OPTION',
  },
  ref: {
    tagName: 'REF',
  },
  data: {
    tagName: 'DATA',
  },
  style: {
    tagName: 'STYLE',
  },
  label: {
    tagName: 'LABEL',
  },
  span: {
    tagName: 'SPAN',
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
  boolean: {
    tagName: 'INPUT',
    attributes: {
      0: {
        name: 'type',
        value: 'checkbox',
      },
    },
  },
  input: {
    tagName: 'INPUT',
  },
  select: {
    tagName: 'SELECT',
  },
  zeroOrMore: {
    tagName: 'ZEROORMORE',
  },
  default: {},
};

module.exports = definitions;
