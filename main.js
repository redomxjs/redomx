var parse5 = require('parse5')
var _ = require('lodash')
var indentString = require('indent-string')
var jsesc = require('jsesc')

var redomNS = 'redom.'

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

var compileNodes = function(indentBase, indent, nodes, separator, parent_result, svg) {
  if (parent_result === undefined) {
    idx = -1
    parent_result = {}
  }
  if (separator === undefined || nodes.length < 2) {
    separator = ''
  }

  indent += '  '

  var result = {
    render: {
      definitions: '',
      tree: ''
    },
    update: '',
    classes: parent_result.classes || [],
    nodes: [],
    nodesWithIfRT: false,
    idx: parent_result.idx || idx
  }

  var compiledNodes = _.map(nodes, function (v, k) {
    var node = {}
    result.idx++
    node.listingById = `this.view[${result.idx}]`
    node.listing = node.listingById + ' = '
    node.definition = ''
    node.update = ''
    node.attrsRender = ''
    node.for = false
    node.if = false
    node.ifRT = false
    node.raw = false
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
      } else if (attr.name == 'r-for') {
        var regex = /\(?([_a-zA-Z0-9]*)(?:.*?,.*?([_a-zA-Z0-9]*?))?\)? in (.*).*?/
        var match = attr.value.match(regex)
        node.for = node.for || {}
        node.for.valueName = match[1]
        node.for.keyName = match[2]
        node.for.in = match[3]
        attrRender = false
      } else if (attr.name == 'r-for-id') {
        node.for = node.for || {}
        node.for.id = attr.value
        attrRender = false
      } else if (attr.name == 'r-raw') {
        attr.name = 'innerHTML'
        var rawHTML = jsesc(_.trim(parse5.serialize(v)))
        attr.value = `'${rawHTML}'`
        node.raw = true
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
        node.update += `\n${indentBase}  ${redomNS}setAttr(this.view[${result.idx}], '${attr.name}', ${attr.value})`
      } else if (_.startsWith(attr.name, '@')) {
        node.name = attr.name.substring(1)
        node.listing += `this.view['${node.name}'] = `
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
    if (node.for) {
      var itemClassResult = ''
      var itemClassName = (node.name && node.name != '')? `${_.capitalize(node.name)}Item`: false
      var itemClassId = result.classes.length
      var itemClassListingById = `this.viewClasses[${itemClassId}]`
      var itemClassListingByName = (itemClassName)? `this.viewClasses['${itemClassName}']`: false

      // Class setup
      var comp = compileNodes('  ', '  ', v.childNodes)
      var childModule = createModuleBody('  ', comp, 'constructor() {', `update (${node.for.valueName}${(node.for.keyName)? ", " + node.for.keyName: ''}) {`)
      itemClassResult = `${itemClassListingById} = class {
${childModule}
}`

      if (itemClassListingByName) {
        itemClassResult += `\n${itemClassListingByName} = ${itemClassListingById}`
      }
      result.classes.push(itemClassResult)
      node.update += `\n${indentBase}  ${node.listingById}.update(${node.for.in})`
      node.definition += `(() => { var element = ${redomNS}list('${v.tagName}', ${itemClassListingById}${ (node.for.id)? ', \'' + node.for.id + '\'': '' }); ${redomNS}setAttr(element, { ${node.attrsRender} }); return element })()`
    } else if (v.nodeName === '#text') {
      if (valueRT) {
        node.update += `\n${indentBase}  this.view[${result.idx}].textContent = ${value}`
        node.definition += `${redomNS}text('')`
      } else if (valueJS) {
        node.definition += `${redomNS}text(${value})`
      } else {
        node.definition += `${redomNS}text(\` ${value}\`)`
      }
    } else {
      node.definition += `${redomNS}${ (node.svg)? 'svg': 'el' }('${v.tagName}', {`
      node.definition += node.attrsRender
      node.definition += `\n${indent}}, [\n`
      if (!node.raw) {
        var childResult = compileNodes(indentBase, indent, v.childNodes, ',', result, node.svg)
        node.definition += childResult.render.tree
        if (childResult.nodesWithIfRT) {
          var childListings = _.join(_.map(childResult.nodes, function (childNode) {
            if (childNode.ifRT) {
              return `((${childNode.if})? ${childNode.listingById}: null)`
            } else {
              return childNode.listingById
            }
          }), `,\n${indent}  `)
          node.update += `\n${indent}${redomNS}setChildren(${node.listingById}, [\n${indent}  ${childListings}\n${indent}])`
        }
        node.update += childResult.update
        result.classes = childResult.classes
        result.idx = childResult.idx
      }
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

var createModuleBody = function(indentBase, comp, templateFn, updateFn, afterCreate) {
  return `${indentBase}${templateFn}
${indentBase}  this.view = {}
${indentBase}  this.viewClasses = {}
${indentString(comp.classes.join('\n'), indentBase.length + 2)}
${comp.render.definitions}
${comp.render.tree}
${indentBase}  this.el = this.view.el${ (afterCreate)? '\n' + indentBase + '  ' + afterCreate: ''}
${indentBase}}
${indentBase}${updateFn}${comp.update}
${indentBase}}`
}

module.exports = function redomx ( code ) {
  var regex = /^(.*?)(template.?\(.*?\).?{)[\S\s]*?(<[\S\s]*>)[\S\s]*?(\1})$/gm

  code = code.replace(regex, function (gm, m1, m2, m3, m4) {
    var htmlTree = parse5.parseFragment(m3)
    var comp = compileNodes(m1, m1, htmlTree.childNodes)
    var result = createModuleBody(m1, comp, m2, 'update () {', 'this.update()')
    return result
  })

  return {
    code: code
  }
}
