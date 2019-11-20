// const fs = require('fs');
const {DOMParser} = require('xmldom');


const {
  parseRng,
} = require('./parsers.js');
const {
  convert,
} = require('./createDom.js');

// const f = fs.readFileSync('../schema.rng', 'utf8');
// const parser = new DOMParser();
// const document = parser.parseFromString(f, 'text/xml');
// const start = document.getElementsByTagName('start');
// const dom = start[0];

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


const rs = parseRng(convert(example));

console.log(rs);
//copy and paste rs and put it in to a .html file
