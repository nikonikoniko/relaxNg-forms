/* global hljs */
const {
  each,
  reduce,
  tail,
} = require('lodash/fp');

import Prism from 'prismjs';

const {schema2form, form2xml} = require('../src/parsers');
const {convert} = require('../src/parsers/schema/createDom');

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



function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
         // .replace(/'/g, "&#039;");
 }



form.addEventListener('change', (e) => {
  console.log(form);
  const h = form.getElementsByTagName('textarea');
  console.log(h);
  const j = form2xml(form);
  console.log(j);
  console.log('aaaaaaaaaaaaaaaaaaaaa');
  const high = Prism.highlight(j, Prism.languages.xml, 'xml');
  result.innerHTML = high;
});


schema.value = example;
xmlForm.innerHTML = r;

schema.onkeyup = function(e) {
  const newschema = e.target.value;
  const r = schema2form(convert(newschema));
  xmlForm.innerHTML = r;
};
