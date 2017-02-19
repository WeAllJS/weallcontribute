#!/usr/bin/env node

var fs = require('fs')
var hostedGitInfo = require('hosted-git-info')
var path = require('path')

var yargs = require('yargs')
.usage('Usage: $0 [repository] [options]')
.example('$0 wealljs/weallcontribute > contrib.md', 'Output a contrib doc to stdout and pipe to contrib.md')
.example('$0 -o .', 'Read project repo from package.json or git config, then write `CONTRIBUTING.md` to current directory (.).')
.alias('o', 'output')
.nargs('o', 1)
.normalize('o')
.describe('o', 'Output to directory or make new file.')
.help()

var repo = yargs.argv._[0]
if (!repo) {
  try {
    repo = require(path.join(process.cwd(), 'package.json')).repository
    repo = repo.url || repo
    console.warn('Using project repo from package.json')
  } catch (e) { console.error(e) }
}
if (!repo) {
  try {
    repo = require('child_process').spawnSync('git', ['remote', '-v'], {encoding: 'utf8'}).output[1].match(/origin\s+([^\s]+)\s/)[1]
    console.warn('Using project repo from current git repo')
  } catch (e) {}
}
if (!repo) {
  console.error('Unable to figure out your repo.\n')
  yargs.showHelp()
  process.exit(1)
}

repo = hostedGitInfo.fromUrl(repo)
if (!repo) {
  console.error('Invalid repository url or shorthand.\n')
  yargs.showHelp()
  process.exit(1)
}
if (repo.type !== 'github') {
  console.error('Only github repositories are supported (for now).\n')
  yargs.showHelp()
  process.exit(1)
}

var contrib = fs.readFileSync(
  path.join(__dirname, 'CONTRIBUTING.md'),
  'utf8'
).replace(/wealljs\/weallcontribute/gi, repo.path())

if (!yargs.argv.output) {
  console.log(contrib)
  process.exit(0)
}

var target = path.resolve(yargs.argv.output)
try {
  if (fs.statSync(target).isDirectory()) {
    target = path.join(target, 'CONTRIBUTING.md')
  }
} catch (e) {}

fs.writeFileSync(target, contrib)
console.log('Contrib docs written to', target)
process.exit(0)
