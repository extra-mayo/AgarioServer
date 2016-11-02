/**
 * Created by ho on 10/29/2016.
 */

function Player(name, socketID, EXP, players, enemy, gameStatus, haven) {
    this.socketID = socketID.substring(2, socketID.length);
    this.pos = createVector(250, 250);
    this.EXP = EXP;
    this.radius = 50;
    this.players = players;
    this.enemy = enemy;
    this.name = name;
    this.gameStatus = gameStatus;
    this.haven = haven;
    this.sound = loadSound('../images/suck.mp3');

    // randomize our color
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);

    this.display = function () {

        fill(255);
        imageMode(CENTER);
        smooth();
        strokeCap(ROUND);
        strokeWeight(5);
        stroke(this.r - 20, this.g - 20, this.b - 20);
        fill(this.r, this.g, this.b);
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
        noStroke();
        fill(255);
        textAlign(CENTER);
        text(this.name, this.pos.x, this.pos.y);
        this.move();

    };

    this.move = function () {

        var mousePos = createVector(mouseX - width / 2, mouseY - height / 2);
        mousePos.setMag(3);
        this.pos.add(mousePos);


        if (this.pos.x > width) {
            this.pos.x = width;
        }
        if (this.pos.x < 0) {
            this.pos.x = 0;
        }
        if (this.pos.y > height) {
            this.pos.y = height;
        }
        if (this.pos.y < 0) {
            this.pos.y = 0;
        }

        for (var i = 0; i < this.EXP.length; i++) {
            if (this.checkHit(this.EXP[i]) == 1) {
                this.EXP[i].respawn();
            }
        }
        // for (var i = 0; i < enemy.length; i++) {
        //     if (this.checkHit(enemy[i]) == 1) {
        //         enemy[i].respawn();
        //     }
        //     else if (this.checkHit(enemy[i]) == -1) {
        //         this.gameStatus = 2;
        //         console.log("YOU LOSE!");
        //     }
        // }

        for (var i = 0; i < this.haven.length; i++) {
            // console.log(this.haven[i]);
            if (this.checkHit(this.haven[i]) == 3) {
                console.log("Hit haven!");
                this.radius = this.haven[i].radius;
            }
        }


        for (var i = 0; i < this.players.length; i++) {
            var id = this.players[i].id;
            if (id.substring(2, id.length) !== this.socketID) {
                console.log(id.substring(2, id.length), this.socketID);
                if (this.checkHit(this.players[i]) == 2) {
                    console.log("YOU LOSE!");
                    this.gameStatus = 2;
                }
            }
        }


    };

    //check hit values:
    //1 = successfuly eat
    //0 = not within proximity
    //-1 = dead
    //2 = nothing happens
    //3 = smaller radius


    this.checkHit = function (other) {
        console.log(other);
        var x, y;
        if (typeof other.x !== 'undefined' && typeof other.y !== 'undefined') {
            x = other.x;
            y = other.y;
        }
        else {
            x = other.pos.x;
            y = other.pos.y;
        }
        var d = dist(this.pos.x, this.pos.y, x, y);
        if (d < (this.radius / 2)) {
            //if player's radius is bigger than other's radius
            //if player hits a haven and player's radius is bigger, its radius gets smaller
            if (this.radius > other.radius) {
                if (other.id == "haven") {
                    return 3;
                }
                var newArea = PI * this.radius * this.radius + PI * other.radius + other.radius;
                this.radius = sqrt(newArea / PI) + 0.2;
                // console.log(this.radius);
                this.sound.play();
                return 1;
            }
            //if player's radius is smaller or equal to than haven's, nothing happens.
            else {
                if (other.id == "haven") {
                    return 2;
                }
                this.gameStatus = 2;
                return -1;
            }
        }
        else {
            return 0;
        }
    };


}