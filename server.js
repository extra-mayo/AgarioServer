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
setInterval(heartbeat, 1);

function heartbeat(){
    io.sockets.emit('heartbeat', players);
}

io.sockets.on('connection', function(socket){
    console.log("new client: " + socket.id);

    socket.on('start', function(data){
        players.push(new Player(socket.id, data.name, data.x, data.y, data.radius, data.r, data.g, data.b));
    });

    socket.on('update', function(data){
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

    socket.on('dead', function(data){
        for (var i = 0; i < players.length; i++){
            if (socket.id == players[i].id){
                //splice shit here
                console.log("yous dead");
            }
        }

    });

    socket.on('disconnect', function(){
        console.log("client d/c");
    })
});