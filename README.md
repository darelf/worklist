Worklist
========

[![Build Status](https://travis-ci.org/darelf/worklist.svg)](https://travis-ci.org/darelf/worklist)

`npm install worklist -g`

Just a quick and dirty way to keep track of what I do
on a weekly basis. Each entry is one line, each week is
stored in a file by date.

Personally, at the end of the week, or beginning of the
next, I email that text file to my boss.

    worklist add "Worked on project Foo in order to bleep the bloop"
    worklist add "Project Bar needed Baz to have a maximum length of 255"
    worklist list
    0: Worked on project Foo in order to bleep the bloop
    1: Project Bar needed Baz to have a maximum length of 255
    worklist delete 1
    worklist list
    0: Worked on project Foo in order to bleep the bloop

See the code. It's a pretty simple script.

#### Update
I've changed the project to use [leveldb](https://github.com/rvagg/node-levelup).
So now it stores all the data in a leveldb, and I use `worklist list` and pipe
the results to a file in order to turn in my weekly reports.

MIT license

