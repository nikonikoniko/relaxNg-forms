const {
  each,
  reduce,
  tail,
} = require('lodash/fp');

const {schema2form, form2xml} = require('../src/parsers');
const {convert} = require('../src/parsers/schema/createDom');

console.log(schema2form);
console.log('llllllllllll');

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
const r = schema2form(convert(example));

const schema = document.getElementById('schema');
const xmlForm = document.getElementById('xmlForm');
const result = document.getElementById('result');

const form = document.querySelector('#form');

form.addEventListener('change', (e) => {
  console.log(form);
  const h = form.getElementsByTagName('textarea');
  console.log(h);
  const j = form2xml(form);
  console.log(j);
  console.log('aaaaaaaaaaaaaaaaaaaaa');
});


schema.value = example;
xmlForm.innerHTML = r;

schema.onkeyup = function(e) {
  const newschema = e.target.value;
  const r = schema2form(convert(newschema));
  xmlForm.innerHTML = r;
};
