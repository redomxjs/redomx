// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }
 function classs(d) {
	return {
		type: 'CLASS',
		start: d[0],
		content: d[1],
		end: d[2]
	}
}
var grammar = {
    ParserRules: [
    {"name": "ANY", "symbols": [/[\s\S]/], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\t\n\v\f\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess":  function(d) {
        	return d[0].join("")
        } },
    {"name": "__$ebnf$1", "symbols": [/[\t\n\v\f\s]/]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", /[\t\n\v\f\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess":  function(d) {
        	return d[0].join("")
        } },
    {"name": "NAME$ebnf$1", "symbols": [/[a-zA-Z]/]},
    {"name": "NAME$ebnf$1", "symbols": ["NAME$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "NAME", "symbols": ["NAME$ebnf$1"], "postprocess":  function(d) {
        	return d[0].join("")
        } },
    {"name": "CONSTRUCTOR", "symbols": ["CONSTRUCTOR_START", "_", "CONSTRUCTOR_END"]},
    {"name": "CONSTRUCTOR_START$string$1", "symbols": [{"literal":"c"}, {"literal":"o"}, {"literal":"n"}, {"literal":"s"}, {"literal":"t"}, {"literal":"r"}, {"literal":"u"}, {"literal":"c"}, {"literal":"t"}, {"literal":"o"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CONSTRUCTOR_START", "symbols": ["CONSTRUCTOR_START$string$1", "__", {"literal":"("}, "_", {"literal":")"}, "_", {"literal":"{"}], "postprocess":  function(d) {
        	return d.join("")
        } },
    {"name": "CONSTRUCTOR_END", "symbols": [{"literal":"}"}], "postprocess": id},
    {"name": "TEMPLATE", "symbols": ["TEMPLATE_START", "_", "TEMPLATE_END"], "postprocess":  function(d) {
        	return {
        		type: 'TEMPLATE',
        		start: d[0],
        		content: d[1],
        		end: d[2]
            }  
        } },
    {"name": "TEMPLATE_START$string$1", "symbols": [{"literal":"t"}, {"literal":"e"}, {"literal":"m"}, {"literal":"p"}, {"literal":"l"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TEMPLATE_START", "symbols": ["TEMPLATE_START$string$1", "__", {"literal":"("}, "_", {"literal":")"}, "_", {"literal":"{"}], "postprocess":  function(d) {
        	return d.join("")
        } },
    {"name": "TEMPLATE_END", "symbols": [{"literal":"}"}], "postprocess": id},
    {"name": "CLASS", "symbols": ["CLASS_START", "CLASS_CONTENT", "CLASS_END"], "postprocess": classs},
    {"name": "CLASS_START$string$1", "symbols": [{"literal":"c"}, {"literal":"l"}, {"literal":"a"}, {"literal":"s"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CLASS_START", "symbols": ["_", "CLASS_START$string$1", "__", "NAME", "__", {"literal":"{"}], "postprocess":  function(d) {
        	return {
        		type: 'CLASS_START',
        		indent: d[0],
        		name: d[3],
        		rest: d.splice(1).join('')
        	}
        } },
    {"name": "CLASS_CONTENT", "symbols": [], "postprocess": id},
    {"name": "CLASS_CONTENT", "symbols": ["TEMPLATE", "__", "UPDATE", "CLASS_CONTENT"], "postprocess":  function (d) {
        	return {
        		template: d[0],
        		update: d[2],
        		next: d[3]
        	}
        }
        },
    {"name": "CLASS_CONTENT", "symbols": ["TEMPLATE", "CLASS_CONTENT"], "postprocess":  function (d) {
        	return {
        		template: d[0],
        		next: d[1]
        	}
        }
        },
    {"name": "CLASS_CONTENT", "symbols": ["CONSTRUCTOR", "CLASS_CONTENT"], "postprocess":  function (d) {
        	return {
        		template: d[0],
        		next: d[1]
        	}
        }
        },
    {"name": "CLASS_CONTENT", "symbols": ["ANY", "CLASS_CONTENT"], "postprocess":  function (d) {
        	return {
        		type: 'CLASS_CONTENT',
        		content: d[0],
        		next: d[1]
        	}
        } },
    {"name": "CLASS_END", "symbols": [{"literal":"}"}], "postprocess": id},
    {"name": "UPDATE$string$1", "symbols": [{"literal":"u"}, {"literal":"p"}, {"literal":"d"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "UPDATE", "symbols": ["UPDATE$string$1"], "postprocess": id},
    {"name": "MAIN", "symbols": ["FILE"], "postprocess": id},
    {"name": "FILE", "symbols": []},
    {"name": "FILE", "symbols": ["CLASS", "FILE"]},
    {"name": "FILE", "symbols": ["ANY", "FILE"]},
    {"name": "HTML_START", "symbols": [{"literal":"<"}]},
    {"name": "HTML_END", "symbols": [{"literal":">"}]}
]
  , ParserStart: "MAIN"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
