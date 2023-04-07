import * as core from "@actions/core";
import { context } from "@actions/github";

type GithubContext = typeof context;

const inputName = core.getInput("name");

greet(inputName);

function getRepoUrl(context: GithubContext): string {
  return `${context.serverUrl}/${context.repo.owner}/${context.repo.repo}`;
}

function greet(name: string) {
  console.log(`hello ${name} - ${getRepoUrl(context)}`);

  //console log more info from context
  console.log("context", context);
  //   console.log("action", context.action);
  //   console.log("workflow", context.workflow);
  //   console.log("apiUrl", context.apiUrl);
  //   console.log("actor", context.actor);
  //   console.log("eventName", context.eventName);
  //   console.log("job", context.job);

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
