#!/usr/bin/env node

var fs = require('fs')
var redomx = require('./main.js')

var html = fs.readFileSync('./dev-input.js', 'utf-8')

var result = redomx(html)

console.log(result)
