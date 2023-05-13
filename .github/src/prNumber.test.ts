import { GitHubScriptArguments } from "./types";
import { prNumber } from "./prNumber";
import { Octokit } from "./__mocks__/github";
import { Context } from "@actions/github/lib/context";
import * as core from "./__mocks__/core";

describe("prNumber", () => {
    it("should set the prNumber from the context", async () => {
        const context: Context = {
            payload: {
                pull_request: {
                    number: 1234,
                },
            },
            issue: {
                number: 1234,
                owner: "",
                repo: "",
            },
            repo: {
                owner: "",
                repo: "",
            },
            eventName: "",
            sha: "",
            ref: "",
            workflow: "",
            action: "",
            actor: "",
            job: "",
            runNumber: 0,
            runId: 0,
            apiUrl: "",
            serverUrl: "",
            graphqlUrl: "",
        };

        const args: GitHubScriptArguments = {
            github: new Octokit(),
            context: context,
            core: core,
        };

        const stringNumber = await prNumber(args);

        expect(stringNumber).toEqual("1234");
    });
});
