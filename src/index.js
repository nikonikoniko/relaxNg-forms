const fs = require('fs');
const {DOMParser} = require('xmldom');


const {
  parseRng,
} = require('./parsers.js');

const f = fs.readFileSync('../schema.rng', 'utf8');
const parser = new DOMParser();
const document = parser.parseFromString(f, 'text/xml');
const start = document.getElementsByTagName('start');
const dom = start[0];

const rs = parseRng(dom);

console.log(rs);
//copy and paste rs and put it in to a .html file
