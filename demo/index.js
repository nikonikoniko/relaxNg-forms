
const {debounce, throttle} = require('lodash');
const {schema2form, form2xml} = require('../src/parsers');

const example = `
<?xml version="1.0" encoding="UTF-8"?>
<grammar
  xmlns="http://relaxng.org/ns/structure/1.0"
  xmlns:a="http://relaxng.org/ns/compatibility/annotations/1.0"
  datatypeLibrary="http://www.w3.org/2001/XMLSchema-datatypes">

  <start>
    <ref name="PRODUCT" />
  </start>

  <define name="PRODUCT">
    <element name="product">
      <optional>
        <element name="sku">
          <data type="token" />
        </element>
        <element name="sgtin">
          <data type="token" />
        </element>
        <element name="gtin">
          <data type="token" />
        </element>
      </optional>
      <element name="name">
        <ref name="NOTEMPTY" />
      </element>
      <element name="brand">
        <text/>
      </element>
      <optional>
        <element name="company">
          <text/>
        </element>
        <element name="season">
          <text/>
        </element>
        <ref name="PRODUCT_WEIGHT" />
      </optional>
      <element name="colourway">
        <ref name="NOTEMPTY" />
      </element>
      <ref name="PRODUCT_CATEGORY" />
      <optional>
        <ref name="PRODUCT_TYPE" />
      </optional>
      <oneOrMore>
        <ref name="ASSEMBLY"/>
      </oneOrMore>
      <zeroOrMore>
        <ref name="STEP"/>
      </zeroOrMore>
      <zeroOrMore>
        <ref name="CERTIFICATION"/>
      </zeroOrMore>
      <zeroOrMore>
        <ref name="FINISHING"/>
      </zeroOrMore>
      <optional>
        <element name="instructions">
          <text/>
        </element>
      </optional>
    </element>
  </define>

  <define name="ASSEMBLY">
    <element name="assembly">
      <element name="name">
        <text/>
      </element>
      <oneOrMore>
        <ref name="MATERIAL"/>
      </oneOrMore>
    </element>
  </define>

  <define name="MATERIAL">
    <element name="material">
      <ref name="MATERIAL_TYPE"/>
      <element name="name">
        <text/>
      </element>
      <optional>
        <ref name="CONSTRUCTION"/>
      </optional>
      <oneOrMore>
        <ref name="COMPONENT"/>
      </oneOrMore>
      <optional>
        <ref name="WEIGHT" />
        <element name="consumption">
          <data type="decimal"/>
          <attribute name="unit">
            <list>
              <choice>
                <value>sqm</value>
              </choice>
            </list>
          </attribute>
        </element>
      </optional>
      <zeroOrMore>
        <ref name="STEP"/>
      </zeroOrMore>
      <ref name="COLOUR"/>
      <optional>
        <ref name="PATTERN"/>
      </optional>
      <ref name="DYEING_METHOD"/>
      <optional>
        <element name="dyestuff">
          <text/>
        </element>
      </optional>
      <ref name="PRINTING_METHOD"/>
      <optional>
        <element name="print_dyestuff">
          <text/>
        </element>
      </optional>
      <zeroOrMore>
        <ref name="FINISHING" />
      </zeroOrMore>
      <zeroOrMore>
        <ref name="CHEMICAL_COMPLIANCE"/>
      </zeroOrMore>
      <zeroOrMore>
        <ref name="BIODEGRADABILITY_CERTIFICATION"/>
      </zeroOrMore>
      <zeroOrMore>
        <ref name="MATERIAL_CERTIFICATION"/>
      </zeroOrMore>
      <optional>
        <ref name="TANNING_METHOD"/>
      </optional>
      <optional>
        <element name="tanning_agent">
          <text/>
        </element>
      </optional>
      <optional>
        <ref name="PRETANNING_METHOD"/>
      </optional>
      <optional>
        <element name="pretanning_agent">
          <text/>
        </element>
      </optional>
    </element>
  </define>

  <define name="COMPONENT">
    <element name="component">
      <ref name="CONTENT"/>
      <element name="percentage">
        <data type="decimal"/>
        <!-- percentage total should be 100 -->
      </element>
      <element name="is_recycled">
        <data type="boolean"/>
      </element>
      <optional>
        <element name="source_recycled_input">
          <text/>
        </element>
        <element name="source_raw_material">
          <text/>
        </element>
      </optional>
      <zeroOrMore>
        <ref name="STEP"/>
      </zeroOrMore>
    </element>
  </define>

  <define name="STEP">
    <element name="step">
      <element name="type">
        <text/>
      </element>
      <element name="country">
        <text/>
      </element>
      <optional>
        <element name="company_name">
          <text/>
        </element>
        <element name="street">
          <text/>
        </element>
        <element name="postal">
          <text/>
        </element>
        <element name="city">
          <text/>
        </element>
        <element name="oar">
          <text/>
        </element>
      </optional>
    </element>
  </define>

  <define name="PRODUCT_CATEGORY">
    <element name="product_category">
      <list>
        <choice>
          <value>Clothing</value>
          <value>Accessories</value>
          <value>Footwear</value>
          <value>Other</value>
        </choice>
      </list>
    </element>
  </define>

  <define name="PRODUCT_TYPE">
    <element name="product_type">
      <text />
      <!-- in development: adding choices
        <list>
            <choice>
                <value>Clothing</value>
                <value>Accessories</value>
                <value>Footwear</value>
                <value>Other</value>
            </choice>
        </list>
        -->
    </element>
  </define>

  <define name="CERTIFICATION">
    <element name="certification">
      <text />
      <!-- in development: adding choices
           these are certifications for the PRODUCT
        <list>
            <choice>
                <value>CERTIFICATION 1</value>
                <value>CERTIFICATION 2</value>
                <value>CERTIFICATION 3</value>
                <value>CERTIFICATION 4</value>
            </choice>
        </list>
        -->
    </element>
  </define>

  <define name="CONTENT">
    <element name="content">
      <list>
        <choice>
          <value>Abaca</value>
          <value>Bamboo</value>
          <value>Banana</value>
          <value>Bee wax</value>
          <value>Coconut</value>
          <value>Cork</value>
          <value>Corn</value>
          <value>Corozo</value>
          <value>Cotton</value>
          <value>Hemp</value>
          <value>Jute</value>
          <value>Kapok</value>
          <value>Manila Hemp</value>
          <value>Mother of Pearl</value>
          <value>Natural Latex</value>
          <value>Natural Rubber</value>
          <value>Nettle</value>
          <value>Organic Cotton</value>
          <value>Organic Hemp</value>
          <value>Organic Linen</value>
          <value>Pineapple Fiber</value>
          <value>Ramie</value>
          <value>Sisal</value>
          <value>Soy</value>
          <value>Stone Nut</value>
          <value>Vegetable Ivory</value>
          <value>Wax</value>
          <value>Wood</value>
          <value>Alpaca</value>
          <value>Casein</value>
          <value>Cashmere</value>
          <value>Merino Wool</value>
          <value>Mohair</value>
          <value>Organic Wool</value>
          <value>Organic Silk</value>
          <value>Peace Silk</value>
          <value>Silk</value>
          <value>Wool</value>
          <value>Yak</value>
          <value>Bamboo Rayon</value>
          <value>Cupro</value>
          <value>Ecovero</value>
          <value>Lyocell</value>
          <value>Modal</value>
          <value>Orange Fiber</value>
          <value>Rayon</value>
          <value>Refibra</value>
          <value>Tencel</value>
          <value>Viscose</value>
          <value>Acetate</value>
          <value>Acrylic</value>
          <value>Bio-PDO</value>
          <value>Biodegradable Polyester</value>
          <value>Cellulose Acetate</value>
          <value>Econyl</value>
          <value>Elastane</value>
          <value>Modacrylic</value>
          <value>Nylon</value>
          <value>Polyamide</value>
          <value>Polyester</value>
          <value>Polyether</value>
          <value>Polyethylene</value>
          <value>Polylactic Acid</value>
          <value>Polyurethane</value>
          <value>Resin</value>
          <value>Solvent-free Polyurethane</value>
          <value>Triacetate</value>
          <value>Water-based Polyurethane</value>
          <value>Aluminium</value>
          <value>Brass</value>
          <value>Bronze</value>
          <value>Copper</value>
          <value>Nickel</value>
          <value>Stainless Steel</value>
          <value>Titanium</value>
          <value>Zinc</value>
          <value>Zinc Alloy</value>
          <value>Water-based Adhesive</value>
          <value>Solvent-free Adhesive</value>
        </choice>
      </list>
    </element>
  </define>


  <define name="MATERIAL_TYPE">
    <element name="type">
      <list>
        <choice>
          <value>Fabric</value>
          <value>Yarn</value>
          <value>Trim</value>
          <value>Leather</value>
          <value>Alternative leather</value>
        </choice>
      </list>
    </element>
  </define>

  <define name="WEIGHT">
    <element name="weight">
      <data type="decimal"/>
      <attribute name="unit">
        <list>
          <choice>
            <value>gsm</value>
          </choice>
        </list>
      </attribute>
    </element>
  </define>

  <define name="PRODUCT_WEIGHT">
    <element name="product_weight">
      <data type="decimal"/>
      <attribute name="unit">
        <list>
          <choice>
            <value>g</value>
            <value>kg</value>
            <value>oz</value>
            <value>lb</value>
          </choice>
        </list>
      </attribute>
    </element>
  </define>

  <define name="FINISHING">
    <element name="finishing">
      <list>
        <choice>
          <value>Beading/Sequins</value>
          <value>Prepared for dyeing</value>
          <value>Ready to dye</value>
          <value>Sheared or singed</value>
          <value>Washed</value>
          <value>Calendered</value>
          <value>Caseins</value>
          <value>Coated</value>
          <value>Desized</value>
          <value>Embroidery</value>
          <value>Fillers</value>
          <value>Matting agents</value>
          <value>Mercerized</value>
          <value>Natural</value>
          <value>Oils</value>
          <value>Raised</value>
          <value>Roughened</value>
          <value>Sanforized</value>
          <value>Softening agents</value>
          <value>Washed</value>
          <value>Waxes</value>
        </choice>
      </list>
    </element>
  </define>

  <define name="COLOUR">
    <element name="colour">
      <list>
        <choice>
          <value>beige</value>
          <value>black</value>
          <value>black and white</value>
          <value>blue</value>
          <value>brown</value>
          <value>coral</value>
          <value>gold</value>
          <value>green</value>
          <value>grey</value>
          <value>khaki</value>
          <value>multicoloured</value>
          <value>navy</value>
          <value>nude</value>
          <value>off-white</value>
          <value>orange</value>
          <value>pink</value>
          <value>purple</value>
          <value>red</value>
          <value>rose</value>
          <value>silver</value>
          <value>taupe</value>
          <value>teal</value>
          <value>turquoise</value>
          <value>untreated</value>
          <value>white</value>
          <value>yellow</value>
        </choice>
      </list>
    </element>
  </define>

  <define name="PATTERN">
    <element name="pattern">
      <list>
        <choice>
          <value>None</value>
          <value>abstract</value>
          <value>baby and kids</value>
          <value>black and white</value>
          <value>check</value>
          <value>checked</value>
          <value>chevron</value>
          <value>damask</value>
          <value>dotted</value>
          <value>floral</value>
          <value>geometric</value>
          <value>gingham</value>
          <value>heathered</value>
          <value>herringbone</value>
          <value>houndstooth</value>
          <value>marled</value>
          <value>melange</value>
          <value>mixed</value>
          <value>motifs for children</value>
          <value>ombre</value>
          <value>other pattern</value>
          <value>other</value>
          <value>paisley</value>
          <value>self striping</value>
          <value>stars</value>
          <value>striped</value>
          <value>stripes</value>
          <value>tartan</value>
          <value>unicoloured</value>
        </choice>
      </list>
    </element>
  </define>

  <define name="DYEING_METHOD">
    <element name="dyeing_method">
      <list>
        <choice>
          <value>None</value>
          <value>Top Dyed</value>
          <value>Yarn Dyed</value>
          <value>Dope Dyed</value>
          <value>Aniline</value>
          <value>Dyed through</value>
          <value>Pigmented</value>
          <value>Top Coat</value>
        </choice>
      </list>
    </element>
  </define>

  <define name="PRINTING_METHOD">
    <element name="printing_method">
      <list>
        <choice>
          <value>None</value>
          <value>Digital printed</value>
          <value>Hand painted</value>
          <value>Inkjet printed</value>
          <value>Roller printed</value>
          <value>Screen printed</value>
        </choice>
      </list>
    </element>
  </define>

  <define name="TANNING_METHOD">
    <element name="tanning_method">
        <list>
          <choice>
              <value>synthetic</value>
              <value>vegetable</value>
          </choice>
        </list>
    </element>
  </define>

  <define name="PRETANNING_METHOD">
    <element name="tanning_method">
        <list>
          <choice>
              <value>synthetic</value>
              <value>vegetable</value>
          </choice>
        </list>
    </element>
  </define>

  <define name="CHEMICAL_COMPLIANCE">
    <element name="chemical_compliance">
        <list>
          <choice>
              <value>C2C</value>
              <value>Fairtrade Prohibited Material List</value>
              <value>Global Recycling Standard</value>
              <value>IVN</value>
              <value>REACH</value>
              <value>ZDHC</value>
              <value>MRSL</value>
              <value>ECHA SVHC Candidate List</value>
          </choice>
        </list>
    </element>
  </define>

  <define name="CONSTRUCTION">
    <element name="construction">
      <list>
        <choice>
          <value>Birds Eye</value>
          <value>Cable</value>
          <value>Cardigan</value>
          <value>Fleece</value>
          <value>French Terry</value>
          <value>Intarsia</value>
          <value>Interlock</value>
          <value>Jacquard Jersey</value>
          <value>Lacoste</value>
          <value>Milano Rib</value>
          <value>Pointelle</value>
          <value>Purl Knit</value>
          <value>Rachel</value>
          <value>Rib Knit</value>
          <value>Single Jersey</value>
          <value>Sliver Knit</value>
          <value>Tricot</value>
          <value>Velour</value>
          <value>Plain weave</value>
          <value>Basket weave</value>
          <value>Buckram</value>
          <value>Cambric</value>
          <value>Chiffon</value>
          <value>Chintz</value>
          <value>Corduroy</value>
          <value>Crepe</value>
          <value>Denim</value>
          <value>Dobby</value>
          <value>Drill</value>
          <value>Flannel</value>
          <value>Gabardine</value>
          <value>Georgette</value>
          <value>Jacquard</value>
          <value>Khadi</value>
          <value>Pique</value>
          <value>Poplin</value>
          <value>Satin</value>
          <value>Sateen</value>
          <value>Taffeta</value>
          <value>Twill</value>
          <value>Non Woven</value>
          <!-- from alternative leather: -->
          <value>Non Woven Dry Laid</value>
          <value>Non Woven Wet Laid</value>
          <value>Non Woven Spunlaid</value>
          <value>Non Woven Meltblown</value>
          <value>Non Woven Needle-punched</value>
          <value>Bonded</value>
          <value>Naturally occurring</value>
          <value>Lab grown</value>
          <value>Biotextile</value>
          <!-- from trim type: -->
          <value>Beads</value>
          <value>Braid</value>
          <value>Buckle</value>
          <value>Button</value>
          <value>Care label</value>
          <value>Collar stay</value>
          <value>Elastic</value>
          <value>Eyelet/grommet</value>
          <value>Fusing material</value>
          <value>Hook and Loop</value>
          <value>Interfacing</value>
          <value>Lace</value>
          <value>Label</value>
          <value>Piping cord </value>
          <value>Rivets</value>
          <value>Seam sealing tape</value>
          <value>Sequins</value>
          <value>Shoulder pad</value>
          <value>String/Draw Cord</value>
          <value>Swivel hook</value>
          <value>Twill tape</value>
          <value>Velcro tape</value>
          <value>Wadding </value>
          <value>Zipper</value>
        </choice>
      </list>
    </element>
  </define>


  <define name="BIODEGRADABILITY_CERTIFICATION">
    <element name="biodegradability_certification">
        <list>
          <choice>
            <value>ISO 11721-1</value>
            <value>ISO 846</value>
            <value>en 13432</value>
            <value>OECD 301 A</value>
            <value>OECD 301 E</value>
            <value>ISO 7827</value>
            <value>OECD 302 A</value>
            <value>ISO 9887</value>
            <value>OECD 302 B</value>
            <value>ISO 9888</value>
            <value>OECD 303 A</value>
            <value>OECD 301 D</value>
            <value>OECD 310</value>
            <value>DIN EN ISO 14593</value>
            <value>DIN EN ISO 9408</value>
            <value>OECD 301 F</value>
            <value>OECD 302 A</value>
            <value>OECD 302B</value>
            <value>CEC-L-103-12</value>
            <value>OECD 311</value>
            <value>DIN EN ISO 11734</value>
          </choice>
        </list>
    </element>
  </define>

  <define name="MATERIAL_CERTIFICATION">
    <element name="material_certification">
        <list>
          <choice>
            <value>C2C Bronce</value>
            <value>C2C Silver</value>
            <value>C2C Gold</value>
            <value>C2C Platin</value>
            <value>GOTS</value>
            <value>IVN Best</value>
            <value>GRS Global Recycling Standard</value>
            <value>EU Ecolabel</value>
            <value>BSCI</value>
            <value>Fairtrade</value>
            <value>SA8000</value>
            <value>C2C Silver</value>
            <value>C2C Gold</value>
            <value>C2C Platin</value>
            <value>GRS</value>
            <value>GOTS</value>
            <value>IVN</value>
            <value>ILO</value>
            <value>Global Compact</value>
            <value>Naturleder</value>
            <value>IVN</value>
            <value>LWG (Leather Working Group) Gold</value>
            <value>LWG (Leather Working Group) Silver</value>
            <value>LWG (Leather WorkingGroup) Bronze</value>
            <value>Ecopelle,</value>
            <value>ICEC</value>
          </choice>
        </list>
    </element>
  </define>

  <define name="NOTEMPTY">
    <data type="string">
      <!-- allow for newlines, but not just whitespace -->
      <param name="pattern">
      (.|\n|\r)*\S(.|\n|\r)*</param>
      <!-- at least one character should be included -->
      <param name="minLength">
      1</param>
    </data>
  </define>

</grammar>
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


const initialForm = schema2form(example);
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
  const r = schema2form(newschema);
  xmlForm.innerHTML = r;
  addI();
};
