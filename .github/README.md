# GitHub Actions Supporting Scripts

See https://github.com/actions/github-script/ for more information. Set

## Usage

```yaml
- name: Checkout repository
  uses: actions/checkout@v3

- name: Setup TypeScript scripts
  uses: ./.github/workflows/setup-ts-scripts
  with:
      path: ./.github/ts-actions

- name: Run script1
  # script1.ts can use core.setOutput('result', 'some value') to set a named output
  # it can also set environment variables with core.exportVariable('result', 'some value')
  id: script1
  uses: ./.github/workflows/run-ts-script
  with:
      script: script1

- name: Use script1 result
  run: |
      echo "Script1 result: ${{ steps.script1.outputs.result }}"
```
