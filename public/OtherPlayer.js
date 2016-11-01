/**
 * Created by ho on 10/31/2016.
 */

function OtherPlayer(name, x, y, radius, r, b, g){
    this.name = name;
    this.x = x;
    this.y = y;
    this.pos = createVector(x, y);
    this.radius = radius;
    this.r = r;
    this.b = b;
    this.g = g;

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

    };

}