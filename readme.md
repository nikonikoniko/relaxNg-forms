# RelaxNG JS Forms

### relaxNg schema -> HTML Form -> XML data

A simple, sane library to parse and transform RelaxNG XML schema files (.rng) into webforms.

### demo

a simple demo running in the browser is up and running at:

[http://niko.io/projects/relaxNg-forms/demo/](http://niko.io/projects/relaxNg-forms/demo/)

# dependencies

this library relies on `xmldom` for parsing xml, `z` for pattern matching, and `lodash/fp` for all kinds of utilities.

# development

I have only added the elements of relaxNg that I care about -- there is probably still a lot to be added!
additionally, it will only run properly in modern browsers.
## browser based development environment

`npm run dev`
 spins up a webpack bundler at a url
