/**
 * Created by ho on 10/29/2016.
 */
function Enemy(name, id, EXP, enemy, player, gameStatus, haven) {
    this.pos = createVector(random(width), random(height));
    this.EXP = EXP;
    this.id = id;
    this.name = name;
    this.enemy = enemy;
    this.player = player;
    this.haven = haven;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.radius = 50;
    // this.radius = random(10, 15);
    this.gameStatus = gameStatus;
    this.speed = 1;

    this.display = function () {
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

    this.avoidHaven = function () {
        for (var i = 0; i < this.haven.length; i++) {
            if (this.radius < this.haven[i].radius) {
                var d = dist(this.pos.x, this.pos.y, this.haven[i].pos.x, this.haven[i].pos.y);

                if (d < this.haven[i].radius * 2) {
                    if (this.pos.x < this.haven[i].pos.x) {
                        this.pos.x -= this.speed;
                    }
                    if (this.pos.x > this.haven[i].pos.x) {
                        this.pos.x += this.speed;
                    }
                    if (this.pos.y < this.haven[i].pos.y) {
                        this.pos.y -= this.speed;
                    }
                    if (this.pos.y > this.haven[i].pos.y) {
                        this.pos.y += this.speed;
                    }
                }
            }
        }
    };

    this.goToNearestHaven = function () {
        smallestDistX = this.haven[0].pos.x;
        smallestDistY = this.haven[0].pos.y;
        var smallestDistance = dist(this.pos.x, this.pos.y, this.haven[0].pos.x, this.haven[0].pos.y);
        for (var i = 1; i < this.haven.length; i++) {
            var d = dist(this.pos.x, this.pos.y, this.haven[i].pos.x, this.haven[i].pos.y);
            if (d < smallestDistance) {
                smallestDistX = this.haven[i].pos.x;
                smallestDistY = this.haven[i].pos.y;
            }
        }
        if (this.radius < this.haven[0].radius) {
            if (this.pos.x < smallestDistX) {
                this.pos.x += this.speed;
            }
            if (this.pos.x > smallestDistX) {
                this.pos.x -= this.speed;
            }
            if (this.pos.y < smallestDistY) {
                this.pos.y += this.speed;
            }
            if (this.pos.y > smallestDistY) {
                this.pos.y -= this.speed;
            }
        }

    };

    this.goToNearestEXP = function () {
        var smallestX = this.EXP[0].pos.x, smallestY = this.EXP[0].pos.y;
        for (var i = 0; i < this.EXP.length; i++) {
            if (dist(this.pos.x, this.pos.y, this.EXP[i].pos.x, this.EXP[i].pos.y) < dist(this.pos.x, this.pos.y, smallestX, smallestY)) {
                smallestX = this.EXP[i].pos.x;
                smallestY = this.EXP[i].pos.y;
            }
        }
        //chase after the nearest EXP;
        if (this.pos.x < smallestX) {
            this.pos.x += this.speed;
        }
        if (this.pos.x > smallestX) {
            this.pos.x -= this.speed;
        }
        if (this.pos.y < smallestY) {
            this.pos.y += this.speed;
        }
        if (this.pos.y > smallestY) {
            this.pos.y -= this.speed;
        }
    };

    this.goToNearestEXPNotNear = function (other) {
        var smallestX = this.EXP[0].pos.x, smallestY = this.EXP[0].pos.y;
        var foundNearest = true;
        for (var i = 0; i < this.EXP.length; i++) {
            if (dist(this.pos.x, this.pos.y, this.EXP[i].pos.x, this.EXP[i].pos.y) < dist(this.pos.x, this.pos.y, smallestX, smallestY)
                &&
                dist(other.pos.x, other.pos.y, this.EXP[i].pos.x, this.EXP[i].pos.y) > (other.radius * 2)) {
                smallestX = this.EXP[i].pos.x;
                smallestY = this.EXP[i].pos.y;
            }
        }
        //chase after the nearest this.EXP;
        if (this.pos.x < smallestX) {
            this.pos.x += this.speed;
        }
        if (this.pos.x > smallestX) {
            this.pos.x -= this.speed;
        }
        if (this.pos.y < smallestY) {
            this.pos.y += this.speed;
        }
        if (this.pos.y > smallestY) {
            this.pos.y -= this.speed;
        }
    };


    this.movements = function () {
        for (var i = 0; i < this.enemy.length; i++) {
            if (this.enemy[i].id != this.id) {
                var greaterRadiusBetweenEnemy = this.radius;
                if (this.radius < enemy[i].radius) {
                    greaterRadiusBetweenEnemy = enemy[i].radius;
                }
                var greaterRadiusBetweenUser = this.radius;
                if (this.radius < player.radius) {
                    greaterRadiusBetweenUser = player.radius;
                }
                //If this enemy is within certain distance from other enemies
                if (dist(this.pos.x, this.pos.y, this.enemy[i].pos.x, this.enemy[i].pos.y) <= (greaterRadiusBetweenEnemy * 2)) {
                    //and if this enemy's radius is less than other enemy's radius, run away while going to the nearest EXP not near the enemy
                    if (this.radius < enemy[i].radius) {
                        //if the radius is less than haven's radius, then
                        this.goToNearestHaven();
                        if (this.pos.x < this.enemy[i].pos.x) {
                            // this.previousX = this.pos.x;
                            this.pos.x -= this.speed;
                        }
                        if (this.pos.x > this.enemy[i].pos.x) {
                            // this.previousX = this.pos.x;
                            this.pos.x += this.speed;

                        }
                        if (this.pos.y < this.enemy[i].pos.y) {
                            // this.previousY = this.pos.y;
                            this.pos.y -= this.speed;
                        }
                        if (this.pos.y > this.enemy[i].pos.y) {
                            // this.previousY = this.pos.y;
                            this.pos.y += this.speed;
                        }
                        //if not, then just go to nearest EXP;
                        this.goToNearestEXPNotNear(this.enemy[i]);
                    }
                    //otherwise if this radius is bigger, then chase after the smaller enemy
                    else {
                        if (this.pos.x < this.enemy[i].pos.x) {
                            // this.previousX = this.pos.x;
                            this.pos.x += this.speed;
                        }
                        if (this.pos.x > this.enemy[i].pos.x) {
                            // this.previousX = this.pos.x;
                            this.pos.x -= this.speed;

                        }
                        if (this.pos.y < this.enemy[i].pos.y) {
                            // this.previousY = this.pos.y;
                            this.pos.y += this.speed;
                        }
                        if (this.pos.y > this.enemy[i].pos.y) {
                            // this.previousY = this.pos.y;
                            this.pos.y -= this.speed;
                        }
                    }
                }
            }
        }
        if (dist(this.pos.x, this.pos.y, this.player.pos.x, this.player.pos.y) <= (greaterRadiusBetweenUser * 2)) {
            // console.log("CHECK TWO!");
            if (this.radius < this.player.radius) {
                this.goToNearestHaven();
                if (this.pos.x < this.player.pos.x) {
                    this.pos.x -= this.speed;
                }
                if (this.pos.x > this.player.pos.x) {
                    // this.previousX = this.pos.x;
                    this.pos.x += this.speed;

                }
                if (this.pos.y < this.player.pos.y) {
                    // this.previousY = this.pos.y;
                    this.pos.y -= this.speed;
                }
                if (this.pos.y > this.player.pos.y) {
                    // this.previousY = this.pos.y;
                    this.pos.y += this.speed;
                }
                this.goToNearestEXPNotNear(player);
            }
            //this.radius is bigger than player's
            else {
                if (this.pos.x < this.player.pos.x) {
                    // this.previousX = this.pos.x;
                    this.pos.x += this.speed;
                }
                if (this.pos.x > this.player.pos.x) {
                    // this.previousX = this.pos.x;
                    this.pos.x -= this.speed;

                }
                if (this.pos.y < this.player.pos.y) {
                    // this.previousY = this.pos.y;
                    this.pos.y += this.speed;
                }
                if (this.pos.y > this.player.pos.y) {
                    // this.previousY = this.pos.y;
                    this.pos.y -= this.speed;
                }
            }
        }
        if (this.radius > this.haven[0].radius) {
            this.avoidHaven();
            this.goToNearestEXP();
        }
        //if there's no enemy/player within distance
        else {
            this.goToNearestEXP();
        }
    };


    //check hit values:
    //1 = successfuly eat
    //0 = not within proximity
    //-1 = dead

    this.checkHit = function (other) {
        var d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (d < (this.radius / 2)) {
            if (this.radius > other.radius) {
                if (other.id == "haven") {
                    return 3;
                }
                var newArea = PI * this.radius * this.radius + PI * other.radius + other.radius;
                this.radius = sqrt(newArea / PI) + 0.2;
                // console.log(this.radius);
                return 1;
            }
            else {
                if (other.id == "haven") {
                    return 2;
                }
                return -1;
            }
        }
        else {
            return 0;
        }
    };

    this.respawn = function () {
        this.radius = random(21, 30);
        this.pos = createVector(random(500), random(500));
    };

    this.move = function () {

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

        this.movements();
        for (var i = 0; i < EXP.length; i++) {
            if (this.checkHit(EXP[i]) == 1) {
                EXP[i].respawn();
            }
        }

        for (var i = 0; i < enemy.length; i++) {
            if (this.id != enemy[i].id) {
                if (this.checkHit(enemy[i]) == 1) {
                    enemy[i].respawn();
                }
                else if (this.checkHit(enemy[i]) == -1) {
                    this.respawn();
                }
            }
        }
        if (this.checkHit(player) == 1) {
            console.log("YOU LOSE!");
            this.gameStatus = 2;
        }
        else if (this.checkHit(player) == -1) {
            this.respawn();
        }

        for (var i = 0; i < this.haven.length; i++) {
            if (this.checkHit(this.haven[i]) == 3) {
                this.radius = this.haven[i].radius;
            }
        }
    }


}
