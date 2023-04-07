import * as core from "@actions/core";

const inputName = core.getInput("name");

greet(inputName);

function greet(name: string) {
  console.log(`hello ${name}`);
  core.summary
    .addHeading("My action summary")
    .addTable([
      [
        { data: "File", header: true },
        { data: "Result", header: true },
      ],
      ["foo.js", "Pass ✅"],
      ["bar.js", "Fail ❌"],
      ["test.js", "Pass ✅"],
    ])
    .addLink("View staging deployment!", "https://github.com")
    .addDetails("View logs", "This is a log")
    .addBreak()
    .addList(["foo", "bar", "baz"])
    .addQuote("This is a quote")
    .addSeparator()
    .addEOL()
    .write();
}
