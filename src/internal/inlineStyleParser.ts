interface PositionDetail {
  line: number;
  column: number;
}

interface Position {
  start: PositionDetail;
  end: PositionDetail;
  source?: string;
}

export interface Declaration {
  type: "declaration";
  property: string;
  value: string;
  position: Position;
}

interface Comment {
  type: "comment";
  comment: string;
  position: Position;
}

interface Options {
  source?: string;
  silent?: boolean;
}

const COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
const NEWLINE_REGEX = /\n/g;
const WHITESPACE_REGEX = /^\s*/;
const PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
const COLON_REGEX = /^:\s*/;
const VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
const SEMICOLON_REGEX = /^[;\s]*/;
const TRIM_REGEX = /^\s+|\s+$/g;

const NEWLINE = "\n";
const FORWARD_SLASH = "/";
const ASTERISK = "*";
const EMPTY_STRING = "";

class ExtendedError extends Error {
  reason: string;
  filename: string;
  line: number;
  column: number;
  source: string;

  constructor(message: string) {
    super(message);
    this.reason = "";
    this.filename = "";
    this.line = 0;
    this.column = 0;
    this.source = "";
  }
}

export const inlineStyleParser = (
  style: string,
  optionsParam?: Options
): (Declaration | Comment)[] => {
  if (typeof style !== "string") {
    throw new TypeError("First argument must be a string");
  }

  if (!style) return [];

  const options = optionsParam || {};

  let lineno = 1;
  let column = 1;

  function updatePosition(str: string) {
    const lines = str.match(NEWLINE_REGEX);
    if (lines) lineno += lines.length;
    const i = str.lastIndexOf(NEWLINE);
    column = ~i ? str.length - i : column + str.length;
  }

  function position() {
    const start = { line: lineno, column: column };
    return function (node: Declaration | Comment) {
      node.position = new Position(start);
      whitespace();
      return node;
    };
  }

  class Position {
    start: PositionDetail;
    end: PositionDetail;
    source: string | undefined;
    content: string;

    constructor(start: Position["start"]) {
      this.start = start;
      this.end = { line: lineno, column: column };
      this.source = options.source;
      this.content = style;
    }
  }

  const errorsList: Error[] = [];

  function error(msg: string) {
    const err = new ExtendedError(
      `${options.source}:${lineno}:${column}: ${msg}`
    );
    err["reason"] = msg;
    err["filename"] = options.source || "";
    err["line"] = lineno;
    err["column"] = column;
    err["source"] = style;

    if (options.silent) {
      errorsList.push(err);
    } else {
      throw err;
    }
  }

  function match(re: RegExp) {
    const m = re.exec(style);
    if (!m) return;
    const str = m[0];
    updatePosition(str);
    style = style.slice(str.length);
    return m;
  }

  function whitespace() {
    match(WHITESPACE_REGEX);
  }

  function comments(
    rules: (Declaration | Comment)[] = []
  ): (Declaration | Comment)[] {
    let c;
    while ((c = comment())) {
      // @ts-ignore
      if (c !== false) {
        rules.push(c);
      }
    }
    return rules;
  }

  function comment(): Comment | false {
    const pos = position();
    if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1))
      return false;

    let i = 2;
    while (
      EMPTY_STRING != style.charAt(i) &&
      (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))
    ) {
      ++i;
    }
    i += 2;

    if (EMPTY_STRING === style.charAt(i - 1)) {
      // @ts-ignore
      return error("End of comment missing");
    }

    const str = style.slice(2, i - 2);
    column += 2;
    updatePosition(str);
    style = style.slice(i);
    column += 2;

    // @ts-ignore
    return pos({
      type: "comment",
      comment: str,
    }) as Comment;
  }

  function declaration(): Declaration | false {
    const pos = position();

    const prop = match(PROPERTY_REGEX);
    if (!prop) return false;
    comment();

    // @ts-ignore
    if (!match(COLON_REGEX)) return error("property missing ':'");

    const val = match(VALUE_REGEX);

    // @ts-ignore
    const ret = pos({
      type: "declaration",
      property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
      value: val
        ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING))
        : EMPTY_STRING,
    }) as Declaration;

    match(SEMICOLON_REGEX);

    return ret;
  }

  function declarations() {
    const decls: (Declaration | Comment)[] = [];

    comments(decls);

    let decl;
    while ((decl = declaration())) {
      // @ts-ignore
      if (decl !== false) {
        decls.push(decl);
        comments(decls);
      }
    }

    return decls;
  }

  function trim(str: string) {
    return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
  }

  whitespace();
  return declarations();
};
