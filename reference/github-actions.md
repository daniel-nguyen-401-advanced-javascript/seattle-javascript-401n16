# Setting Up GitHub Actions

Setup "Github Actions" so that your code can be properly tested in Github as you make new pushes to your branches and pull requests to master

- Click the `Actions` tab in your repository
- Select `Node.js` as the workflow
- Edit the `.yml` file as follows
  - Note the changes to the `on:` key as well as the  `node-version`
- Commit this change

> Github will now run all of your automated tests (anything covered by `npm test` in your package.json) every time you push code to a branch or try to merge a pull request. In fact, it will block pull requests until your tests are all passing.

```yml
name: Node CI

on: [push,pull_request]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [10.x]

    steps:
    - uses: actions/checkout@v1
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - name: npm install, build, and test
      run: |
        npm ci
        npm run build --if-present
        npm test
      env:
        CI: true
```

### 