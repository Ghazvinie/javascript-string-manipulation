let index = require("./index.js");
let LineEndings = require("./index.js").LineEndings;
let transformLineEnding = require("./index.js").transformLineEnding;

let helpText = require("./info.js");
let help = require("./info.js").help;
let usage = require("./info.js").usage;

// Display help text and exit if when someone passes `-h` or `--help`.
if (process.argv.includes("-h") || process.argv.includes("--help")) {
  console.log(help);
  process.exit(0);
}

// Gather input from stdin.
let buffer = "";

process.stdin.on("data", data => {
  buffer += data;
});

// When stdin closes, operate on the gathered input.
process.stdin.on("end", () => {
  let results;

  switch (process.argv.slice(-1)[0]) {
    case "CR":
      results = transformLineEnding(buffer, LineEndings.CR);
      process.stdout.write(results);
      break;

    case "LF":
      results = transformLineEnding(buffer, LineEndings.LF);
      process.stdout.write(results);
      break;

    case "CRLF":
      results = transformLineEnding(buffer, LineEndings.CRLF);
      process.stdout.write(results);
      break;

    default:
      console.error(usage);
      process.exit(1);
  }
});
