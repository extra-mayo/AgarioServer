
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
//hold experience
var experience = [];

function Experience(id) {
    this.id = id;
    this.x = getRand(1000);
    this.y = getRand(720);
    this.radius = 8;
    this.r = getRand(255);
    this.g = getRand(255);
    this.b = getRand(255);
}

function getRand(max){
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - 0)) + 0;
}


for (i = 0; i < 25; i++){
    experience.push((new Experience(i)));
}

var express = require('express');
var app = express();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://discount-agario.herokuapp.com/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



var server = app.listen(process.env.PORT || 3000, listen);

function listen(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at: " + host + ":" + port);
}

app.use(express.static('public'));


//WebSocket
//player heartbeat
var io = require('socket.io')(server);

/*
TODO
 var port = process.env.PORT || 3000;

 var app = require('express').createServer()
 var io = require('socket.io').listen(app);

 app.listen(port);

 // Heroku setting for long polling
 io.configure(function () {
 io.set("transports", ["xhr-polling"]);
 io.set("polling duration", 10);
 });
 */



setInterval(playerInterval, 1);
function playerInterval(){
    io.sockets.emit('playerInterval', players);
}

//EXP heartbeat
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
        experience = data.EXP;
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
        for (var i = 0; i < players.length; i++){
            if (socket.id == players[i].id){
                //splice shit here
                players.splice(i, 1);
            }
        }
    })
});