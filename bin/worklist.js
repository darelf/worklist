#!/usr/bin/env node

var WorkList = require('worklist')
var moment = require('moment')

var defaults = { weekly: true, dbname: process.env.HOME + '/worklist/worklist.db' }
var argv = require('yargs').boolean('weekly').default(defaults).alias('weekly', 'w').argv
var m = moment()

var list = new WorkList(defaults)

function parseCommands() {
  if (argv._.indexOf('list') > -1) {
    list.getCurrentList(function(data) {
      data.forEach(function(v,i) { console.log("%d: %s", i, v.value) })
    })
  }
  if (argv._.indexOf('add') > -1) {
    var position = argv._.indexOf('add')+1
    if (argv._[position]) {
      list.addEntry(argv._[position])
    }
  }
  if (argv._.indexOf('delete') > -1) {
    var position = argv._.indexOf('delete')+1
    if (argv._[position] > -1) {
      var i = argv._[position]
      list.getCurrentList(function() {
        list.deleteEntry(i)
      })
    }
  }
}

parseCommands()
