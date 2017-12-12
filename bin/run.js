'use strict';

const service = require("../server/service"); // Ties into service.js (just created) giving this script access to those exposed functions thanks for module.export
const http = require('http'); // Provides an HTTP object from core NODE.JS.

const server = http.createServer(service); // Creates a server object that uses express through the service variable
server.listen(3000);

// Test server now.
// In terminal type: "node bin/run.js"
// Application will run but nothing will be output. Let's create something to show us that our server is running


// If we want to use variables inside a string node, use back-ticks (tilde)
// Function server.address() returns information about the running server
// Node also has environment variable called node_env that can be set to DEVELOPEMENT (default) or PRODUCTION.
server.on('listening', function() {
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} mode.`)
});