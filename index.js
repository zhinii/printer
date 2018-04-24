var express = require('express');
var app = express();
var http = require('http');
var io = require('socket.io')(http);
var path = require('path');
var server = http.createServer(app);

var players = [];

app.use(express.static(__dirname + '/site/laser/'));

app.get('/', function(req, res){
	res.sendFile('laser.html', { root: path.join(__dirname, '../printer/site/laser') });
});

/*
io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		io.emit('disconnect');
		console.log('user disconnected');
	});
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});*/

io.on('connection', function(socket){
	console.log('a user connected');
	var userId = 0;
	
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
	
	socket.on('new_player', function(data) {
		var obj = JSON.parse(data);
		userId = obj.id;
		players.push(obj);
		console.log('id: ' + userId);
		console.log('online players : ' + players.length);
		io.emit('change_users_list', JSON.stringify(players));
	});

    socket.on('user_change_type', function(data) {
        var obj = JSON.parse(data);
        userId = obj.id;
        userType = obj.type;
        console.log('user with id: ' + userId + ' change type to: ' + userType);

        for (var i = 0; i < players.length; i ++) {
            if (players[i].id == userId) {
                players[i].type = userType;
            }
        }
        console.log('online players : ' + players.length);
        io.emit('change_users_list', JSON.stringify(players));
    });
	
	socket.on('disconnect', function () {
		console.log('user disconnected: ' + userId);
		
		var num = -1;
		for (var i = 0; i < players.length; i ++) {
			if (players[i].id == userId) {
				num = i;
			}
		}
		if (num >= 0) {
			players.splice(num, 1);
		}
			
		console.log('online players : ' + players.length);
		io.emit('change_users_list', JSON.stringify(players));
	});
});

http.listen(5009, function(){
	console.log('listening on *:5009');
});