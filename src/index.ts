import * as core from "@actions/core";
import * as github from "@actions/github";

const inputName = core.getInput("name");

greet(inputName);

function getRepoUrl(): string {
  return `${github.context.serverUrl}/${github.context.repo.owner}/${github.context.repo.repo}`;
}

function greet(name: string) {
  console.log(`hello ${name} - ${getRepoUrl()}`);
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
