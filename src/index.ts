import * as core from "@actions/core";
import { context, getOctokit } from "@actions/github";

type GithubContext = typeof context;

const inputName = core.getInput("name");
const ghToken = core.getInput("ghToken");

greet(inputName);

getDiff().then((files) => {
  console.log("files", files);
});

function getRepoUrl(context: GithubContext): string {
  return `${context.serverUrl}/${context.repo.owner}/${context.repo.repo}`;
}

function greet(name: string) {
  console.log(`hello ${name} - ${getRepoUrl(context)}`);

  //console log more info from context
  console.log("context", context);

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

async function getDiff() {
  //if token not provided. do nothing
  if (ghToken && context.payload.pull_request) {
    const octokit = getOctokit(ghToken);

    const result = await octokit.rest.repos.compareCommits({
      owner: context.repo.owner,
      repo: context.repo.repo,
      base: context.payload.pull_request?.base.sha,
      head: context.payload.pull_request?.head.sha,
      per_page: 100,
    });

    return result.data.files || [];
  }

  return [];
}
