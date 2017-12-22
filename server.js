/*jslint node: true, indent: 2 */
'use strict';
var express = require('express');
var util = require('util');
var bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');
var url = require('url');

var cors = require('cors')


var app = express();
app.set('name', "Leadin Chat Demo");
app.set('port', 8888);

var server = require('http').createServer(app);

app.use(require('morgan')('dev'));
app.use(cors())

var users = new require('./server/users')();
var chats = new require('./server/chathistory')();

var wssServer = require('ws').Server({server: server, perMessageDeflate: false});


wssServer.on('connection', function(ws, req) {
    const ip = ws.upgradeReq.headers['sec-websocket-key']

    util.log("Connection from " + util.inspect(ws.upgradeReq.headers['sec-websocket-key']));



    ws.on('message', function(msg) {
      console.log('response',msg);
        if(msg[0] === '/') {
            chatProtocol.handleCommand(ws, msg);
        } else {
            if(ws.user) { //we know who this is
              chatProtocol.broadcast(ws.user.nick, msg);
            } else {

                util.log("Chat ignored from unidentified user");
            }
        }
    });

    ws.on('open', function open() {
      console.log('connected');
      ws.send(Date.now());
    });

    ws.on('close', function(code, message) {
        var user = ws.user;
        user.online = false;
        util.log(user.nick + " dropped out.");
        chatProtocol.broadcast("_server", user.nick + " dropped out.");
    });

});



wssServer.on('error', function(err) {
    util.log("Websocket server error: " + util.inspect(err));
});

var chatProtocol = new require('./server/protocol')(wssServer, users, chats);

//REST routes
app.use(require('./server/routes')(users, chats).router);

util.log('Server started.');
server.listen(app.get('port'), function () {
  util.log('%s listening at %s', app.get('name'), app.get('port'));
});
