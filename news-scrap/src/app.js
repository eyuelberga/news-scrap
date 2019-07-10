let childProcess = require('child_process');

childProcess.execFile('node', ['borkena.js'], function(error, stdout, stderr){
	console.log(stdout);
});
