# weallcontribute [![npm version](https://img.shields.io/npm/v/weallcontribute.svg)](https://npm.im/weallcontribute) [![license](https://img.shields.io/npm/l/weallcontribute.svg)](https://npm.im/weallcontribute) [![Travis](https://img.shields.io/travis/wealljs/weallcontribute.svg)](https://travis-ci.org/wealljs/weallcontribute) [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/wealljs/weallcontribute?svg=true)](https://ci.appveyor.com/project/wealljs/weallcontribute) [![Coverage Status](https://coveralls.io/repos/github/wealljs/weallcontribute/badge.svg?branch=latest)](https://coveralls.io/github/wealljs/weallcontribute?branch=latest)

[`weallcontribute`](https://npm.im/weallcontribute) is a command-line tool for automatically generating and updating [`CONTRIBUTING.md`](https://github.com/blog/1184-contributing-guidelines) guidelines for your projects.

## Install

#### Locally to your npm project (recommended):

`$ npm install --save-dev weallcontribute`

#### Globally:

`$ npm install -g weallcontribute`

## Example

### npm repo
```javascript
// package.json
{
  "scripts": {
    "update-contrib": "weallcontribute -o . && git add CONTRIBUTING.md && git commit -m 'docs(contributing): updated CONTRIBUTING.md'"
  }
}
// Now you can do `npm run update-contrib` any time you
// bump your `weallcontribute` version to bring your docs
// up to date! And you don't need a global install!
```

### Global CLI install
```sh
# Read your repo info from package.json or git
# and pipe the output to `contribs.md`
$ weallcontribute > contribs.md

# Write a CONTRIBUTING.md document for org/proj to the ./foo dir.
$ weallcontribute org/proj -o ./foo
```
