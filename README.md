# urmom.js
A JS library that detects if there is a "ur mom" or a "yo mama" joke with AI.
## Usage
This is an example usage:
```JS
const UrMom = require("@urmomjs/urmom.js");

var mom = new UrMom();

mom.Init();

console.log(mom.Check("ur mom so fat"));
```
Expected output:
```JSON
{ result: true, number: 0.9818620681762695 }
```
