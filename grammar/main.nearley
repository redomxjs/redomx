@include "./util.nearley"
@include "./class.nearley"

MAIN -> FILE {% id %}

FILE -> null
  | CLASS FILE
  | ANY FILE




HTML_START -> "<"
HTML_END -> ">"
