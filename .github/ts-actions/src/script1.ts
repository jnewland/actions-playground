import { Context } from "@actions/github/lib/context";
import { Octokit } from "@octokit/rest";
import * as core from "@actions/core";

async function myFunction(
  context: Context,
  octokit: Octokit,
  core: typeof import("@actions/core")
): Promise<void> {
  // log debug output about the context
    core.debug(`The event context: ${JSON.stringify(context, null, 2)}`);
    // log debug output about the octokit
    core.debug(`The octokit context: ${JSON.stringify(octokit, null, 2)}`);
    // log debug output about the core
    core.debug(`The core context: ${JSON.stringify(core, null, 2)}`);
}

// Example usage
const context = new Context();
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
myFunction(context, octokit, core);
