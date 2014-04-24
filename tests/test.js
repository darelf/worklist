var test = require('tape')

var WorkList = require('../')
var list = new WorkList({weekly: true})

test('create one entry, then delete it', function(t) {
  t.plan(4)
  list.addEntry('This is an entry', function(c) {
    //make sure they agree
    t.equal(c.length, 1, "database list is length 1")
    t.equal(list.current.length, 1, "memory list is length 1")
    // cleanup
    list.deleteEntry(0, function() {
      list.getCurrentList( function(c2) {
        t.equal(c2.length, 0, "database list is length 0")
        t.equal(list.current.length, 0, "memory list is length 0")
      })
    })
  })
})
