/*
    var RtmClient = require('@slack/client').RtmClient;

    var token = process.env.SLACK_API_TOKEN || '';
    // var token = 'xoxb-285678327349-jMXrsNIugbwNfNc6HbFTENeZ';

    var rtm = new RtmClient(token, {logLevel: 'debug'});
    rtm.start();

    // Module does not export anything
    // Instantly connect to slack. Maybe we want to do something before that?
*/


'use strict';

var RtmClient = require('@slack/client').RtmClient; // Saves Slack SDK functions to variable called RtmClient

module.exports.init = function slackClient(token, logLevel) {
    const rtm = new RtmClient(token, {logLevel: 'debug'}); // Instantiate new instance of RtmClient with the token provided
    return rtm;
}
