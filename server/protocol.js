var _ = require('lodash');

exports = module.exports = function(wss, users, chathistory) {
    var _users = users;
    var _history = chathistory;
    var _wss = wss;

    function setUserNick(user, nick) {
        if(_users[user])
        user.nick = nick;
    }

    return {
        handleCommand: function(ws, msg) {
            var commandAndParmas = msg.split(' ', 2);
            if(commandAndParmas.length >= 2 && commandAndParmas[0].toLowerCase() === '/nick') {
                var nick = commandAndParmas[1].trim();
                console.log('this is nick', nick);
                //check if nick is in use
                var user = _users.getUser(nick);
                if(user && user.online) { //currently online, won't accept
                  console.log('users...',_users);
                    ws.send(JSON.stringify({from: "_server", error: "Nick in use"}));
                    return false;
                }
                if(nick[0] === '_') { //reserver nicks starting with '_' to server use
                    ws.send(JSON.stringify({from: "_server", error: "Nick cannot start with the underscore"}));
                    return false;
                }
                //set or create user
                var retMsg;
                // console.log('this is hitting the set/create user logic.... if the user is already there, then it will send a message...',ws.user, ws)
                if(ws.user) {
                    var oldNick = ws.user.nick;
                    _users.changeNick(oldNick, nick);
                    retMsg =  oldNick + " is now known as " + ws.user.nick;
                    console.log(' this is setting a user...',retMsg);
                } else {
                    if(!user) {
                        ws.user = _users.createUser(nick);
                        console.log('creating a user...',ws.user);
                    } else {
                        ws.user = user;
                        console.log('users...',_users);
                    }
                    ws.user.online = true;
                    console.log('just set or created a user, sending back the message!',ws.user);
                    retMsg = "New user: " + ws.user.nick + " joined.";
                }
                this.broadcast("_server", retMsg)
            }
        },
        broadcast: function(from, msg) {
            _history.add(from, msg);
            var chat = {from: from, message: msg};
            _.each(_wss.clients, function(client) {
                console.log('hitting the broadcast function...', from, msg)
                if(client.user) {
                    client.send(JSON.stringify(chat));
                }
            });
        }
    }


};
