@include "util.nearley"

TEMPLATE -> TEMPLATE_START _ TEMPLATE_END {% function(d) {
	return {
		type: 'TEMPLATE',
		start: d[0],
		content: d[1],
		end: d[2]
    }  
} %}
TEMPLATE_START -> "template" __ "(" _ ")" _ "{" {% function(d) {
	return d.join("")
} %}
TEMPLATE_END -> "}" {% id %}
