import { GitHubScriptArguments } from "./types";

export async function prNumber(args: GitHubScriptArguments): Promise<void> {
    const { github, context, core } = args;
    if (github === undefined || context === undefined || core === undefined) {
        throw new Error("Missing required arguments");
    }
    if (context.payload.pull_request !== undefined) {
        console.log(`PR number: ${context.payload.pull_request.number}`);
        core.exportVariable("PR_NUMBER", `${context.payload.pull_request.number}`);
        return;
    }

    const branchName = context.ref.replace("refs/heads/", "");

    const prs = await github.rest.pulls.list({
        ...context.repo,
        state: "open",
        head: `${context.repo.owner}:${branchName}`,
    });

    if (prs.data.length === 0) {
        console.log(`No PR found for branch ${branchName}`);
        process.exit(1);
    }

    const pr = prs.data[0];
    console.log(`Found PR number: ${pr.number}`);
    core.exportVariable("PR_NUMBER", `${pr.number}`);
}
