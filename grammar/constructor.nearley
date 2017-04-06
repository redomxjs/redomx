@include "./util.nearley"

CONSTRUCTOR -> CONSTRUCTOR_START _ CONSTRUCTOR_END

CONSTRUCTOR_START -> "constructor" __ "(" _ ")" _ "{" {% function(d) {
	return d.join("")
} %}
CONSTRUCTOR_END -> "}" {% id %}
