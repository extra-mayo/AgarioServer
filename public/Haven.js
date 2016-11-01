/**
 * Created by ho on 10/31/2016.
 */

function Haven() {

    this.pos = createVector(random(width), random(728));
    this.radius = 40;
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);

    this.id = "haven";

    // this.r2 = random(0, 255);
    // this.g2 = random(0, 255);
    // this.b2 = random(0, 255);

    this.display = function () {
        imageMode(CENTER);
        noStroke();
        fill(this.r, this.g, this.b);
        push();
        translate(this.pos.x, this.pos.y);
        beginShape();
        for (var a = 0; a < TWO_PI; a += 0.01) {
            var offset = map(sin(a * 10 + frameCount * 0.1), -1, 1, -5, 0);
            var r = this.radius + offset;
            var x = r * cos(a);
            var y = r * sin(a);
            vertex(x, y);
        }
        // beginContour();
        // fill(this.r2, this.g2, this.b2);
        for (var a = 0; a < TWO_PI; a += 0.01) {
            var offset = map(sin(a + frameCount + 0.1), -1, 1, -3, 3);
            var r = this.radius - 5 + offset;
            var x = r * cos(a);
            var y = r * sin(a);
            vertex(x, y);
        }
        endShape();
        pop();
    }


}