var levelup = require('levelup')
var sublevel = require('level-sublevel')
var moment = require('moment')
var timestamp = require('monotonic-timestamp')

module.exports = WorkList

function WorkList(opts) {
  var self = this
  if (!(self instanceof WorkList)) return new WorkList(opts)
  if (!opts) opts = {}
  self.name = process.env.HOME + '/worklist/worklist.db'
  var m = moment()
  if (opts.workDate) {
    m = moment(opts.workDate)
  }
  if (opts.weekly) {
    m = m.startOf('week').add('days', 1)
  }
  self.workDate = m.format('YYYY-MM-DD')
  
  if (opts.dbname) {
    if (opts.dbname === 'memory') {
      self.db = sublevel(levelup({ db: require('memdown') }))
    } else {
      self.name = opts.dbname
      self.db = sublevel(levelup(self.name, {db: require('leveldown-prebuilt')}))
    }
  } else {  
    self.db = sublevel(levelup(self.name, {db: require('leveldown-prebuilt')}))
  }

  self.list = self.db.sublevel('list')

  self.current = []
}

// Add an entry and then return the current list of entries
WorkList.prototype.addEntry = function(data, cb) {
  var self = this
  self.list.put(self.workDate + '\x00' + timestamp().toString(36), data,
                function() {
                  self.getCurrentList(cb)
                })
}

WorkList.prototype.getCurrentList = function(cb) {
  var self = this
  var l = []
  self.list.createReadStream({start: self.workDate, end: self.workDate + '\xff'})
    .on('data', function(d) {
      l.push(d)
    })
    .on('close', function() {
      self.current = l
      if (cb) cb(l)
    })
}

// The user will pass us the item number, we translate that to the key
WorkList.prototype.deleteEntry = function(i, cb) {
  var self = this
  var k = self.current[i].key
  self.list.del(k, cb)
}
