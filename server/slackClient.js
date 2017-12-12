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
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS; // 
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
let rtm = null;
let nlp = null;

function handleOnAuthenticated(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`); // Will pass in name of bot and name of team
}


// Function that sents a message to the bot
function handleOnMessage(message) {
    
    nlp.ask(message.text, (err, res) => {
        if(err) {
            console.log(err);
            return;
        }

        if(!res.intent) {
            return rtm.sendMessage("Sorry, I don't know what you are talking about.", message.channel);
        } else if(res.intent[0].value == 'time' && res.location) {
            return rtm.sendMessage(`I don't yet know the time in ${res.location[0].value}`, message.channel);
        } else {
            console.log(res);
            return rtm.sendMessage("Sorry, I don't know what you are talking about.", message.channel);
        }

        rtm.sendMessage('Sorry I did not understand', message.channel, function() {
            // Optional callback function that executed once a message has been sent
        });
    });
}

function addAuthenticatedHandler(rtm, handler) {
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICAED, handler);
}

module.exports.init = function slackClient(token, logLevel, nlpClient) {
    rtm = new RtmClient(token, {logLevel: logLevel}); // Instantiate new instance of RtmClient with the token provided
    nlp = nlpClient;
    addAuthenticatedHandler(rtm, handleOnAuthenticated);
    rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
    return rtm;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;
