/**
 * Created by ho on 10/29/2016.
 */
var yOffset = 0;
function Experience() {
    this.pos = createVector(random(width), random(728));
    this.radius = 8;
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);


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
            vertex(x + this.pos.x, y + this.pos.y);
            xOffset += 0.1;
            //ellipse(x, y, 4, 4);
        }
        endShape();
        yOffset += 0.01;

        // ellipse(this.pos.x, this.pos.y, this.radius, this.radius);

    };

    this.respawn = function () {
        this.r = random(0, 255);
        this.g = random(0, 255);
        this.b = random(0, 255);
        this.pos = createVector(random(width), random(728));
    }


}