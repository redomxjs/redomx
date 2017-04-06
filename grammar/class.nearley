@include "./util.nearley"
@include "./constructor.nearley"
@include "./template.nearley"

@{%
  function classs (d) {
    return {
      type: 'CLASS',
      start: d[0],
      content: d[1],
      end: d[2]
    }
  }
  function classStart (d) {
    return {
      type: 'CLASS_START',
      indent: d[0],
      name: d[3],
      rest: d.splice(1).join('')
    }
  }
%}

CLASS -> CLASS_START CLASS_CONTENT CLASS_END {% classs %}
CLASS_START -> _ "class" __ NAME __ "{" {% classStart %}
CLASS_CONTENT -> null {% id %}
| TEMPLATE __ UPDATE CLASS_CONTENT {% function (d) {
	return {
		template: d[0],
		update: d[2],
		next: d[3]
	}
}
%}
| TEMPLATE CLASS_CONTENT {% function (d) {
	return {
		template: d[0],
		next: d[1]
	}
}
%}
| CONSTRUCTOR CLASS_CONTENT {% function (d) {
	return {
		template: d[0],
		next: d[1]
	}
}
%}
| ANY CLASS_CONTENT {% function (d) {
	return {
		type: 'CLASS_CONTENT',
		content: d[0],
		next: d[1]
	}
} %}
CLASS_END -> "}" {% id %}

UPDATE -> "update" {% id %}
