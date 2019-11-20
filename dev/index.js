const {parseRng} = require('../src/parsers');
const {convert} = require('../src/createDom');

console.log('hello');

const example = `<start>
<element name="book" xmlns="http://relaxng.org/ns/structure/1.0">
   <oneOrMore>
      <element name="page">
         <text/>
      </element>
   </oneOrMore>
</element>
</start>
`

const r = parseRng(convert(example));

const schema = document.getElementById('schema');
const form = document.getElementById('form');
const result = document.getElementById('result');


schema.value = example;
form.innerHTML = r;

schema.onkeyup = function(e) {
  const newschema = e.target.value;
  const r = parseRng(convert(newschema));
  form.innerHTML = r;
};
