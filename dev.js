#!/usr/bin/env node

var fs = require('fs')
var redomx = require('./main.js')

var html = fs.readFileSync('./dev-input.js', 'utf-8')

var result = redomx(html)
fs.writeFileSync('./dev-output.js', result.code)
console.log(result.code)
