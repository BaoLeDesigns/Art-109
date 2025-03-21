// let canvas;

// function setup() {
//     canvas = createCanvas(windowWidth, windowHeight);
//     canvas.position(0, 0);
//     canvas.style("z-index", -2)
//     //background(220);
// }

// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
// }

// function draw() {

// }

// function mouseMoved() {
//     drawThing(mouseX,mouseY);
//     drawThing(mouseX + 80,mouseY -20);
// }

// function drawThing(_x, _y) {
//     strokeWeight(0);
//     fill(random(200, 255), random(200, 255), random(200, 255));
//     ellipse(_x, _y, 30, 30);
// }

let canvas;


function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.position(0, 0);
    canvas.style("z-index", -2)
    angleMode(DEGREES);
}

function draw() {
    background(200);

    rotateX(150); 

    noFill();
    stroke(255);

    for (var i = 0; i < 50; i++) {
        var r = map(sin(frameCount / 2), -1, 1, 100, 200);
        var g = map(i, 0, 50, 100, 200);
        var b = map(cos(frameCount), -1, 1, 200, 100);

        stroke(r, g, b);

        rotate(frameCount / 60); 

        beginShape();
        for (var j = 0; j < 360; j += 30) { 
            var rad = i * 20;
            var x = rad * cos(j);
            var y = rad * sin(j);
            var z = sin(frameCount * 2 + i * 5) * 200;

        
            vertex(x, y, z);
            vertex(x + 25, y, z);
            vertex(x + 50, y + 15, z);
            vertex(x, y + 15, z);
        }
        endShape(CLOSE);
    }
}
