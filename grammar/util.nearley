ANY -> [\s\S] {% id %}
_ -> [\t\n\v\f\s]:* {% function(d) {
	return d[0].join("")
} %}
__ -> [\t\n\v\f\s]:+ {% function(d) {
	return d[0].join("")
} %}
NAME -> [a-zA-Z]:+ {% function(d) {
	return d[0].join("")
} %}
