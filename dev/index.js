const {parseRng} = require('../src/parsers');
const {convert} = require('../src/createDom');

console.log('goooodbyyyywwww');

const example = `

<start>
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
