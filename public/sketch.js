var socket;
var players = [];


var player;
var EXP = [];
var enemy = [];
var misc;
var menuScreen;
var haven = [];

var gameStatus = 0;
function preload() {
    menuScreen = loadImage('../images/MenuBackground.png');

}


function setup() {
    createCanvas(1000, 720);
    socket = io.connect('http://localhost:3000');
    imageMode(CENTER);
    image(menuScreen, width / 2, height / 2, 1280, 720);
}


function menuInput() {
    document.getElementById("menu").style.display = "none";
    var name = document.getElementById("name").value;
    // var EXPCount = document.getElementById("expCount").value;
    // var enemyCount = document.getElementById("enemyCount").value;
    // var havenCount = document.getElementById("havenCount").value;

    for (var i = 0; i < 1; i++) {
        haven.push(new Haven());
    }
    player = new Player(name, socket.id, EXP, players, enemy, gameStatus, haven);

    var data = {
        name: player.name,
        x : player.pos.x,
        y : player.pos.y,
        radius: player.radius,
        r: player.r,
        g: player.g,
        b: player.b

    };
    socket.emit('start', data);

    socket.on('heartbeat', function(data){
        players = data;
        player.players = data;
    });


    //
    // for (var i = 0; i < 1; i++) {
    //     EXP.push(new Experience());
    // }
    // for (var i = 0; i < 1; i++) {
    //     enemy.push(new Enemy("enemy " + i, i, EXP, enemy, player, gameStatus, haven));
    // }
    misc = new Misc(EXP, player, enemy);
    gameStatus = 1;
}



function draw() {

    //0 - Game hasn't started
    //1 - Game started
    //2 - Game ends
    if (gameStatus == 1) {
        background(0);
        misc.setCenter();
        misc.displayWorld();
        // for (var i = 0; i < EXP.length; i++) {
        //     EXP[i].display();
        // }
        // for (var i = 0; i < enemy.length; i++) {
        //     enemy[i].display();
        //     if (enemy[i].gameStatus == 2) {
        //         gameStatus = 2;
        //     }
        // }
        // console.log(player.players);

        for (var i = players.length - 1; i >= 0; i--) {
            var id = players[i].id;
            if (id.substring(2, id.length) !== socket.id) {
                new OtherPlayer(players[i].name, players[i].x, players[i].y, players[i].radius, players[i].r, players[i].g, players[i].b).display();
            }
            else {
                player.socketID = id.substring(2, id.length);
            }
        }
        // con
        misc.displayScore();
        player.display();
        if (player.gameStatus == 2) {
            gameStatus = 2;
        }

        for (var i = 0; i < haven.length; i++) {
            haven[i].display();
        }
        var data = {
            x : player.pos.x,
            y : player.pos.y,
            radius: player.radius
        };
        socket.emit('update', data);
    }
    else if (gameStatus == 2) {
        scale(1);
        fill(255);
        rect(250, 250, 100, 100);
        textAlign(CENTER);
        fill(0);
        textSize(16);
        textLeading(5);
        text("you died lol", 300, 300);

        socket.emit('dead');
    }

}
