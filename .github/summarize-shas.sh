#!/bin/bash

set -e

: "${GITHUB_STEP_SUMMARY:=/dev/stdout}"

TREE_SHA=$(git show HEAD --format=raw | grep tree | awk '{print $2}')

{
  echo "This PR's base is [\`${PR_BASE_SHA}\`](${REPO_URL}/commit/${PR_BASE_SHA}/checks)."
  echo "The last commit pushed to this PR is [\`${PR_HEAD_SHA}\`](${REPO_URL}/commit/${PR_HEAD_SHA}/checks)."
  echo "We're building [\`${PR_MERGE_SHA}\`](${REPO_URL}/commit/${PR_MERGE_SHA}/checks), the SHA of the [merge branch](https://fluffyandflakey.blog/2022/12/21/what-is-a-github-pull-request-merge-branch/) created for this PR."
  echo "The sha of the [tree](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects#_tree_objects) in the root of the repo is \`${TREE_SHA}\`."
} | tee -a "$GITHUB_STEP_SUMMARY"

if [ "${WORKFLOW_BASE_SHA}" != "${PR_BASE_SHA}" ]; then
    {
        echo "This workflow hasn't yet passed on the latest commit on ${BASE_REF} ([\`${PR_BASE_SHA}\`](${REPO_URL}/commit/${PR_BASE_SHA}/checks)): the last successful run was on [\`${WORKFLOW_BASE_SHA}\`](${REPO_URL}/commit/${WORKFLOW_BASE_SHA}/checks)."
        echo "Changes not yet included in a completed build: [\`${WORKFLOW_BASE_SHA}..${PR_BASE_SHA}\`](${REPO_URL}/compare/${WORKFLOW_BASE_SHA}..${PR_BASE_SHA})."
    } | tee -a "$GITHUB_STEP_SUMMARY"
else
    echo "This workflow has passed on the latest commit on ${BASE_REF}: [\`${WORKFLOW_BASE_SHA}\`](${REPO_URL}/commit/${WORKFLOW_BASE_SHA}/checks)." | tee -a "$GITHUB_STEP_SUMMARY"
fi
