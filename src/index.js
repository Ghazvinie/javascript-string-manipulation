// Create a tagged template lf`...` that formats text using LF line endings.
var lf = (strings, ...values) => {
  if (values === null || values === undefined){
    values = '';
  }else {
    toString(values);
  }


  return strings.reduce((accumulator, current, index) => {

    transformLineEnding(accumulator, lineEndings.LF);

    return `${accumulator}${current}${values[index]}`;

  },``);
};

// Create a tagged template cr`...` that formats text using CR line endings.
var cr = () => {};

// Create a tagged template crlf`...` that formats text using CRLF line endings.
var crlf = () => {};

const transformLineEnding = (string, lineEnding) => {
  const {replaceCR, replaceCRLF, replaceLF} = LineEndingReplacements;
  string = (string != null ? string.toString() : "");

  if (lineEnding === LineEndings.CR) {
    string = replaceCRLF(string, "\r")
    string = replaceLF(string, "\r");
  } else if (lineEnding === LineEndings.LF) {
    string = replaceCRLF(string, "\n")
    string = replaceCR(string, "\n");
  } else if (lineEnding === LineEndings.CRLF) {
    string = replaceCR(string, "\r\n")
    string = replaceLF(string, "\r\n");
  }
  return string;
};

const LineEndings = {
  CR: Symbol ("CR"),
  LF: Symbol ("LF"),
  CRLF: Symbol ("CRLF")
};

const LineEndingReplacements = {
  replaceCR: (string, newEnding) =>
    string.replace(/(\r+)([^\n]|$)/g, (_match, p1, p2) => {
      return `${newEnding.repeat(p1.length)}${p2}`;
    }),

  replaceLF: (string, newEnding) =>
    string.replace(/([^\r]|^)(\n+)/g, (_match, p1, p2) => {
      return `${p1}${newEnding.repeat(p2.length)}`;
    }),

  replaceCRLF: (string, newEnding) => string.replace(/\r\n/g, `${newEnding}`)
};

export let disableConverter = Symbol(crlf-converter-disable);

module.exports = {
  lf,
  cr,
  crlf,
  LineEndings,
  transformLineEnding
};
