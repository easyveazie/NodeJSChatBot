require('dotenv').config();
var restify = require('restify');
var builder = require('botbuilder');
var teams = require("botbuilder-teams");

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
// Use this connector if not using Microsoft Teams
/*
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});
*/

// Use this connector only if using Microsoft Teams. We'll use it to get the Team's roster
var connector = new teams.TeamsChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

var bot = new builder.UniversalBot(connector, function (session, args) {
    session.send('Hi ' + session.message.user.name + ' you reached the default message handler. You said \'%s\'.', session.message.text);
});

// Bot Storage: Here we register the state storage for your bot. 
// Default store: volatile in-memory store - Only for prototyping!
// We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
// For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
var inMemoryStorage = new builder.MemoryBotStorage();

bot.set('storage', inMemoryStorage);

// You can also use LUIS intents here to process natural language queries
// See https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-recognize-intent-luis 
bot.dialog('HelloWorld',
    (session) => {
        session.send('Hi ' + session.message.user.name + ' you said \'%s\'.', session.message.text);
        session.endDialog();
    }
).triggerAction({
    matches: /hello\sworld/i
});

bot.dialog('GoodbyeWorld',
    (session) => {
        session.send('Hi ' + session.message.user.name + ' you said \'%s\'.', session.message.text);
        session.endDialog();
    }
).triggerAction({
    matches: /goodbye\sworld/i
});

bot.dialog('FetchMemberList', function (session) {
    var conversationId = session.message.address.conversation.id;
    connector.fetchMembers(session.message.address.serviceUrl, conversationId, function (err, result) {
        if (err) {
            session.endDialog('There is some error');
        }
        else {
            session.endDialog('%s', JSON.stringify(result));
        }
    });
}).triggerAction({
    matches: /list\smembers/i
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());
