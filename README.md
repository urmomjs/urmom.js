[![GitHub issues](https://img.shields.io/github/issues/urmomjs/urmom.js?style=for-the-badge)](https://github.com/urmomjs/urmom.js/issues)
[![GitHub forks](https://img.shields.io/github/forks/urmomjs/urmom.js?style=for-the-badge)](https://github.com/urmomjs/urmom.js/network)
[![GitHub stars](https://img.shields.io/github/stars/urmomjs/urmom.js?style=for-the-badge)](https://github.com/urmomjs/urmom.js/stargazers)
![urmom.js](https://img.shields.io/npm/v/urmom.js?style=for-the-badge)
![urmom.js](https://img.shields.io/npm/dw/urmom.js?style=for-the-badge)

# urmom.js
A JS library that detects if there is a "ur mom" or a "yo mama" joke with AI.
## Install
```
npm i urmom.js
```
## Usage
This is an example usage:
```JS
const UrMom = require("urmom.js");

var mom = new UrMom();

mom.Init();

console.log(mom.Check("ur mom so fat"));
```
Expected output:
```JSON
{ result: true, number: 0.9818620681762695 }
```
