'use strict';

const slackClient = require('../server/slackClient');
const service = require("../server/service"); // Ties into service.js (just created) giving this script access to those exposed functions thanks for module.export
const http = require('http'); // Provides an HTTP object from core NODE.JS.
const server = http.createServer(service); // Creates a server object that uses express through the service variable

const witToken = 'EPZ24X5YGYFYL63XJRHGK4EESM3IXPYP';
const witClient = require('../server/witClient')(witToken);

const slackToken = 'xoxb-285839840913-CFQ5u1autLJUZeGoTgAz86Wd'; // INSERT TOKEN HERE
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken, slackLogLevel, witClient);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

// Test server now.
// In terminal type: "node bin/run.js"
// Application will run but nothing will be output. Let's create something to show us that our server is running


// If we want to use variables inside a string node, use back-ticks (tilde)
// Function server.address() returns information about the running server
// Node also has environment variable called node_env that can be set to DEVELOPEMENT (default) or PRODUCTION.
server.on('listening', function() {
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} mode.`);
});