const {
  each,
  reduce,
  tail,
} = require('lodash/fp');

const {parseRng} = require('../src/parsers');
const {convert, create} = require('../src/createDom');

console.log('hello');

const example = `<start>
<element name="book" xmlns="http://relaxng.org/ns/structure/1.0">
   <oneOrMore>
      <element name="page">

          <element name="number">
            <text/>
          </element>
         <element name="text">
            <text/>
         </element>
      </element>
   </oneOrMore>
   <zeroOrMore>
      <element name="author">
        <text/>
      </element>
    </zeroOrMore>
</element>
</start>
`;

const r = parseRng(convert(example));

const schema = document.getElementById('schema');
const xmlForm = document.getElementById('xmlForm');
const result = document.getElementById('result');

const form = document.querySelector('#form');

form.addEventListener('change', function(e) {
  console.log(e);
  const fd = new FormData(document.querySelector('#form'));
  console.log(...fd);

  const doc = create();
  const root = doc.createElement('root');

  const createEl = ([k, v]) => {
    console.log(k, v);
    const ks = tail(k.split('.'));
    console.log(ks);

    const appendEl = (a, c) => {
      const el = doc.createElement(c);
      console.log('---------');
      console.log(a);
      console.log(el);
      a.appendChild(el);
      console.log(a);
      return el;
    };

    const rootChild = reduce(
      appendEl,
      root,
      ks
    );

  };

  each(createEl, [...fd]);
  console.log('aaaaaaaaaaaaaaaaaaaaa');
  console.log(root);
});


schema.value = example;
xmlForm.innerHTML = r;

schema.onkeyup = function(e) {
  const newschema = e.target.value;
  const r = parseRng(convert(newschema));
  xmlForm.innerHTML = r;
};
