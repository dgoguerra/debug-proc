debug-proc
===========

Show a process output with [debug](https://www.npmjs.com/package/debug) utility.

Installation
------------

```
npm install debug-proc
```

Usage
-----

Running node with the appropriate environment vars (`DEBUG=proc` in this example):

```js
var debugProc = require('debug-proc')('proc');

var proc = spawn('./script.sh', ['abc', 123]);

debugProc(proc);
/*
proc  ./script.sh abc 123 +0ms
proc  stdout message 1 +10ms
proc  stderr message 1 +3ms
proc  stdout message 2 +46ms
proc  stderr message 2 +1ms
*/

// the process spawn args, stderr and stdout can be disabled
debugProc(proc, {spawnargs: false, stdout: false});
/*
proc  stderr message 1 +3ms
proc  stderr message 2 +1ms
*/

debugProc(proc, {decorate: 'name'});
/*
proc  ./script.sh: ./script.sh abc 123 +0ms
proc  ./script.sh: stdout message 1 +10ms
proc  ./script.sh: stderr message 1 +3ms
proc  ./script.sh: stdout message 2 +46ms
proc  ./script.sh: stderr message 2 +1ms
*/

debugProc(proc, {decorate: 'pid'});
/*
proc  pid 10425: ./script.sh abc 123 +0ms
proc  pid 10425: stdout message 1 +10ms
proc  pid 10425: stderr message 1 +3ms
proc  pid 10425: stdout message 2 +46ms
proc  pid 10425: stderr message 2 +1ms
*/

debugProc(proc, {
  decorate: function(proc) {
    return 'process-description: ';
  }
});
/*
proc  process-description: ./script.sh abc 123 +0ms
proc  process-description: stdout message 1 +10ms
proc  process-description: stderr message 1 +3ms
proc  process-description: stdout message 2 +46ms
proc  process-description: stderr message 2 +1ms
*/
```

Run examples
------------

```
cd examples/
DEBUG=proc node example.js
```

License
-------
MIT license - http://www.opensource.org/licenses/mit-license.php

