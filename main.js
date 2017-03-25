var parse5 = require('parse5')
var _ = require('lodash')
var indentString = require('indent-string')

var isJSValue = function(value) {
  return _.startsWith(value, '{')
}

var isJSRealtime = function(value) {
  return _.startsWith(value, '{{')
}

var filterJSValue = function(value) {
  if (isJSRealtime(value)) {
    return value.substring(2, (value.length - 2))
  } else {
    return value.substring(1, (value.length - 1))
  }
}

var compileNodes = function(indentBase, indent, nodes, separator, idx, svg) {
  if (idx === undefined) {
    idx = -1
  }

  indent += '  '

  var result = {
    render: {
      definitions: '',
      tree: ''
    },
    update: '',
    nodes: [],
    nodesWithIfRT: false,
    idx: idx
  }

  if (nodes.length < 2) {
    separator = ''
  }

  var compiledNodes = _.map(nodes, function (v, k) {
    var node = {}
    result.idx++
    node.listingById = `this.view[${result.idx}]`
    node.listing = node.listingById + ' = '
    node.definition = ''
    node.update = ''
    node.attrsRender = ''
    node.if = false
    node.ifRT = false
    node.svg = (svg || v.tagName === 'svg')
    _.each(v.attrs, function (attr) {
      attr.value = _.trim(attr.value)
      var attrJS = isJSValue(attr.value)
      var attrRT = isJSRealtime(attr.value)
      var attrRender = true
      if (attrJS) {
        attr.value = filterJSValue(attr.value)
      }
      attr.value = _.trim(attr.value)

      if (_.startsWith(attr.name, 'on')) {
        attr.value = '() => { ' + attr.value + ' }'
      } else if (attr.name == 'r-svg') {
        attrRender = false
        node.svg = true
      } else if (attr.name == 'r-if') {
        node.ifRT = attrRT
        if (node.ifRT) {
          result.nodesWithIfRT = true
        }
        node.if = attr.value
        attrRender = false
      } else if (attrRT) {
        node.update += `\n${indentBase}  Redom.setAttr(this.view[${result.idx}], '${attr.name}', ${attr.value})`
      } else if (_.startsWith(attr.name, '@')) {
        node.listing += `this.view['${attr.name.substring(1)}'] = `
        attrRender = false
      } else {
        attr.value = `'${attr.value}'`
      }

      if (attrRender) {
        var prefix = ''
        if (node.attrsRender != '') {
          prefix = ', '
        }
        node.attrsRender += `\n${indent}  ${prefix}'${attr.name}': ${attr.value}`
      }
    })
    var value = _.trim(v.value)
    var valueJS = isJSValue(value)
    var valueRT = isJSRealtime(value)
    if (valueJS) {
      value = filterJSValue(value)
    }
    value = _.trim(value)
    if (v.nodeName === '#text') {
      if (valueRT) {
        node.update += `\n${indentBase}  this.view[${result.idx}].textContent = ${value}`
        node.definition += `Redom.text(${value})`
      } else if (valueJS) {
        node.definition += `Redom.text(${value})`
      } else {
        node.definition += `Redom.text(\` ${value}\`)`
      }
    } else {
      node.definition += `Redom.${ (node.svg)? 'svg': 'el' }('${v.tagName}', {`
      node.definition += node.attrsRender
      node.definition += `\n${indent}}, [\n`
      var childResult = compileNodes(indentBase, indent, v.childNodes, ',', result.idx, node.svg)
      node.definition += childResult.render.tree
      if (childResult.nodesWithIfRT) {
        var childListings = _.join(_.map(childResult.nodes, function (childNode) {
          if (childNode.ifRT) {
            return `((${childNode.if})? ${childNode.listingById}: null)`
          } else {
            return childNode.listingById
          }
        }), `,\n${indent}  `)
        node.update += `\n${indent}Redom.setChildren(${node.listingById}, [\n${indent}  ${childListings}\n${indent}])`
      }
      node.update += childResult.update
      result.idx = childResult.idx
      node.definition += `${indent}])`
    }

    if (node.if && !node.ifRT) {
      node.definition = `((${node.if})? ${node.definition}: null)`
      node.update = `\n${indentBase}  if (${node.listingById}) {${indentString(node.update, 2)}
${indentBase}  }`
    }

    return node
  });

  result.nodes = compiledNodes

  _.each(compiledNodes, function (node, idx) {
    var sep = separator
    if (idx === compiledNodes.length - 1) {
      sep = ''
    }
    node.render = indent + node.listing + node.definition
    result.render.tree += `${node.render}${sep}\n`
    // result.render.tree += nodeListingById
    result.update += `${node.update}`
  })

  return result;
}

module.exports = function redomx ( code ) {
  var regex = /^((.*?)template.?\(.*?\).?{)[\S\s]*?(<[\S\s]*>)[\S\s]*?(\2})$/gm

  code = code.replace(regex, function (gm, m1, m2, m3, m4) {
    var htmlTree = parse5.parseFragment(m3)
    var comp = compileNodes(m2, m2, htmlTree.childNodes)

    var result = `${m1}
${m2}  this.view = {}
${comp.render.definitions}
${comp.render.tree}
${m2}  this.el = this.view.el
${m2}  this.update()
${m2}}
${m2}update () {${comp.update}
${m2}}`
    return result
  })

  return {
    code: code
  }
}
