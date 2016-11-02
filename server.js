//All the players that are connected to server
var players = [];

//player properties
function Player (id, name, x, y, radius, r, g, b){
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.r = r;
    this.g = g;
    this.b = b
}

var experience = [];

function Experience(id, x, y, radius, r,g, b){
    this.id = id;
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.r = r;
    this.g = g;
    this.b = b
}

var express = require('express');
var app = express();

var server = app.listen(process.env.PORT || 3000, listen);

function listen(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at: " + host + ":" + port);
}

app.use(express.static('public'));


//WebSocket
var io = require('socket.io')(server);
setInterval(playerInterval, 1);

function playerInterval(){
    io.sockets.emit('playerInterval', players);
}

setInterval(expInterval, 1);

function expInterval(){
    io.sockets.emit('expInterval', experience);
}

io.sockets.on('connection', function(socket){
    console.log("new client: " + socket.id);

    socket.on('start', function(data){
        players.push(new Player(socket.id, data.name, data.x, data.y, data.radius, data.r, data.g, data.b));
    });

    socket.on('updatePlayer', function(data){
        var player;
        for (var i = 0; i < players.length; i++){
            if (socket.id == players[i].id){
                player = players[i];
            }
        }
        player.x = data.x;
        player.y = data.y;
        player.radius = data.radius;
    });

    socket.on('updateEXP', function(data){
        var exp;
        for(var i= 0; i < experience.length; i++){
            if (socket.id == experience[i].id){
                exp = experience[i];
            }
        }
        exp.x = data.x;
        exp.y = data.y;
        exp.r = data.r;
        exp.g = data.g;
        exp.b = data.b;
    });

    socket.on('dead', function(data){
        for (var i = 0; i < players.length; i++){
            if (socket.id == players[i].id){
                //splice shit here
                players.splice(i, 1);
                console.log("yous dead");
            }
        }
    });

    socket.on('disconnect', function(){
        console.log("client d/c");
    })
});