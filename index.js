var debug = require('debug'),
    chalk = require('chalk'),
    isFunction = require('is-function'),
    procStream = require('proc-stream');

function val(value, defaultValue) {
    return typeof value === 'undefined' ? defaultValue : value;
}

module.exports = function(debugNamespace) {
    var logger = debug(debugNamespace);

    return function(proc, opts) {
        if (!opts) opts = {};

        // boolean, whether if show stdout output or not
        var showStdout = !!val(opts.stdout, true);

        // boolean, whether if show stderr output or not
        var showStderr = !!val(opts.stderr, true);

        // optional string to prepend each line with
        var decoration = '';

        // prepend each line with process info
        if (opts.decorate) {
            // let the caller define the string to prepend with
            if (isFunction(opts.decorate)) {
                decoration = opts.decorate(proc);
            } else {
                switch (opts.decorate) {
                    case 'pid':
                        decoration = 'pid '+proc.pid+': ';
                        break;

                    case 'name':
                        decoration = proc.spawnfile+': ';
                        break;

                    // dont setup any decoration
                    default:
                        break;
                }
            }
        }

        var streamOpts = {
            stdout: null,
            stderr: null,
            newline: null
        };

        if (showStdout) {
            streamOpts.stdout = function(chunk) {
                return decoration+chunk;
            };
        }

        if (showStderr) {
            // show stderr output in red
            streamOpts.stderr = function(chunk) {
                return chalk.red(decoration+chunk);
            };
        }

        // set up debug() and return the merged process stream
        return procStream(proc, streamOpts).on('data', function(data) {
            logger(data.toString());
        });
    };
};
