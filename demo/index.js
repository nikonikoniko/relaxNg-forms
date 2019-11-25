
const {debounce, throttle} = require('lodash');
const {schema2form, form2xml} = require('../src/parsers');
const {convert} = require('../src/parsers/schema/createDom');

const example = `<start>
<element name="book" xmlns="http://relaxng.org/ns/structure/1.0">
         <element name="genre">
            <list>
                <choice>
                    <value>Sci Fi</value>
                    <value>Textook</value>
                    <value>Nonfiction</value>
                    <value>Cooking</value>
                </choice>
            </list>
        </element>
       <element name="firstpage">
         <optional>
           <element name="text">
              <text/>
           </element>
         </optional>
      </element>
   <oneOrMore>
      <element name="page">
          <attribute name="number">
             <data type="int" />
          </attribute>
         <element name="text">
            <text/>
         </element>
            <zeroOrMore>
               <element name="footnote">
                  <text/>
               </element>
          </zeroOrMore>
      </element>
   </oneOrMore>
   <zeroOrMore>
      <element name="author">

          <attribute name="role">
           <data type="token" />
          </attribute>
          <element name="name">
           <data type="token" />
          </element>
      </element>
    </zeroOrMore>
</element>
</start>
`;

const schema = document.getElementById('schema');
const xmlForm = document.getElementById('xmlForm');
const result = document.getElementById('result');

const form = document.querySelector('#form');

const prettyXml = (xml) => {
  const Prism = require('prismjs');
  const Normalizer = require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');
  const format = require('xml-formatter');
  const indented = format(xml);
  const high = Prism.highlight(indented, Prism.languages.xml, 'xml');
  const nw = new Normalizer({
    'remove-trailing': true,
    'remove-indent': true,
    'left-trim': true,
    'right-trim': true,
    'break-lines': 80,
    'indent': 0,
    'remove-initial-line-feed': true,
    'tabs-to-spaces': 4,
  });
  const normalized = nw.normalize(high, {});
  return normalized;
};

const updateXml = debounce(() => {
  const xml = form2xml(form);
  result.innerHTML = prettyXml(xml);
}, 100);

form.addEventListener('keyup', updateXml);
form.addEventListener('change', updateXml);


const initialForm = schema2form(convert(example));
schema.value = example;
xmlForm.innerHTML = initialForm;
result.innerHTML = prettyXml(form2xml(document.getElementById('xmlForm')));

const addI = () => {
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(i => i.addEventListener('focusout', (e) => {
    i.checkValidity();
    i.reportValidity();
  }));
};
addI();
form.addEventListener('click', addI);

schema.onkeyup = (e) => {
  const newschema = e.target.value;
  const r = schema2form(convert(newschema));
  xmlForm.innerHTML = r;
  addI();
};
