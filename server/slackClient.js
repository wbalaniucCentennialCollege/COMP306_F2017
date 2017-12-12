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

const RtmClient = require('@slack/client').RtmClient; // Saves Slack SDK functions to variable called RtmClient
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

function handleOnAuthenticated(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`); // Will pass in name of bot and name of team
}

function addAuthenticatedHandler(rtm, handler) {
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICAED, handler);
}

module.exports.init = function slackClient(token, logLevel) {
    const rtm = new RtmClient(token, {logLevel: logLevel}); // Instantiate new instance of RtmClient with the token provided
    addAuthenticatedHandler(rtm, handleOnAuthenticated);
    return rtm;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;
