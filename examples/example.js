var path = require('path'),
    spawn = require('child_process').spawn,
    debugProc = require('../index.js')('proc');

function spawnProcess() {
    return spawn('./example-cmd.sh', ['abc', 123]);
}

setTimeout(function() {
    console.log('process 1');
    var proc = spawnProcess();
    debugProc(proc);
}, 0);

setTimeout(function() {
    console.log('process 2 (only stderr, without spawn args)');
    var proc = spawnProcess();
    debugProc(proc, {spawnargs: false, stdout: false, decorate: 'name'});
}, 500);

setTimeout(function() {
    console.log('process 3 (only stdout)');
    var proc = spawnProcess();
    debugProc(proc, {stderr: false, decorate: 'pid'});
}, 1000);

setTimeout(function() {
    console.log('process 4');
    var proc = spawnProcess();
    debugProc(proc, {decorate: function(proc) {return 'proc4: ';}});
}, 1500);

setTimeout(function() {
    console.log('process 5');
    var proc = spawnProcess();
    debugProc(proc, {decorate: function(proc) {return 'proc5: ';}});
}, 2000);
