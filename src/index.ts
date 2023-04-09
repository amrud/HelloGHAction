import * as core from "@actions/core";
import { context, getOctokit } from "@actions/github";
import dedent from "dedent";

type GithubContext = typeof context;

const inputName = core.getInput("name");
const ghToken = core.getInput("ghToken");

// greet(inputName);

// getDiff().then((files) => {
//   console.log(dedent(`Your PR diff: ${JSON.stringify(files, undefined, 2)}`));
// });

// postCommentInPR();
addLabelToPR();
//addBadgeToReadme();

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

async function postCommentInPR() {
  const octokit = getOctokit(ghToken);
  const result = await octokit.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.payload.pull_request?.number || 0,
    body: "Hello World",
  });
}

//add label to the PR
async function addLabelToPR() {
  const githubToken = core.getInput('github_token');
//   const result = await octokit.rest.issues.addLabels({
//     owner: context.repo.owner,
//     repo: context.repo.repo,
//     issue_number: context.payload.pull_request?.number || 0,
//     labels: ["foo", "bar"],
//   });

//   await octokit.rest.issues.removeLabel({
//     owner: context.repo.owner,
//     repo: context.repo.repo,
//     issue_number: context.payload.pull_request?.number || 0,
//     name: "foo",
//   });
  
   const client = new github.GitHub(githubToken);
    await client.issues.addLabels({
      ["foo"],
      context.repo.owner,
      context.repo.repo,
      issue_number: github.context.issue.number || 0
    });
}

//add badge to README.md
async function addBadgeToReadme() {
  const octokit = getOctokit(ghToken);
  //get content of README.md in the current pull_request
  const result = await octokit.rest.repos.getContent({
    owner: context.repo.owner,
    repo: context.repo.repo,
    path: "README.md",
    issue_number: context.payload.pull_request?.number || 0,
  });

  console.log(result);
}
