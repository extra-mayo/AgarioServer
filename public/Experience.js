/**
 * Created by ho on 10/29/2016.
 */
var yOffset = 0;
function Experience(id, x, y, r, g, b) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.pos = createVector(x, y);
    this.radius = 8;
    this.r = r;
    this.g = g;
    this.b = b;


    this.display = function () {
        imageMode(CENTER);
        noStroke();
        fill(this.r, this.g, this.b);
        beginShape();
        var xOffset = 0;
        for (var a = 0; a < TWO_PI; a += 0.1) {
            var offset = map(noise(xOffset, yOffset), 0, 1, -2, 1);
            var r = this.radius + offset;
            var x = r * cos(a);
            var y = r * sin(a);
            vertex(x + this.x, y + this.y);
            xOffset += 0.1;
            //ellipse(x, y, 4, 4);
        }
        endShape();
        yOffset += 0.01;
        // ellipse(this.x, this.y, this.radius, this.radius);

    };


    this.display2 = function(){
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
        // text(this.name, this.pos.x, this.pos.y);
    };



    this.respawn = function () {
        this.r = random(0, 255);
        this.g = random(0, 255);
        this.b = random(0, 255);
        this.x = random(width);
        this.y =  random(720);
    }


}