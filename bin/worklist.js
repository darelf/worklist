#!/usr/bin/env node

var fs = require('fs')
var moment = require('moment')

var defaults = { weekly: true, workdir: process.env.HOME + '/worklist/' }
var argv = require('yargs').boolean('weekly').default(defaults).alias('weekly', 'w').argv
var m = moment()
if (argv.weekly) {
  m = moment().startOf('week').add('days', 1)
}

var fname = argv.workdir + m.format('YYYY-MM-DD') + '.txt'

var contents = []
fs.readFile(fname, function(err, data) {
  if (!err) {
    contents = data.toString().split('\n').filter(Boolean)
  }
  parseCommands()
})

function saveContents() {
  fs.writeFile(fname, contents.join('\n') + '\n')
}

function parseCommands() {
  if (argv._.indexOf('list') > -1) {
    contents.forEach(function(v,i) { console.log("%d: %s", i, v) })
  }
  if (argv._.indexOf('add') > -1) {
    var position = argv._.indexOf('add')+1
    if (argv._[position]) {
      contents.push(argv._[position])
      saveContents()
    }
  }
  if (argv._.indexOf('delete') > -1) {
    var position = argv._.indexOf('delete')+1
    if (argv._[position]) {
      var i = argv._[position]
      if (contents.length > i) {
        delete contents[i]
        saveContents()
      }
    }
  }
}
