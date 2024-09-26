var config = {
    diameter: 850,
};

const options = Array.from({ length: 100 }).map((_, i) => `example_name_${i < 10 ? `0${i}` : i}`);

const colors = [
    '#1BE7FF',
    '#6EEB83',
    '#E4FF1A', 
    '#E8AA14',
    '#FF5714'
]

let rotation = 0;
let rotateTo = 0;
let easing = 0.05;
let hasStopped = true;
let size = 30;

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    let longest = 0;
    for (const option of options) {
        if (option.length > longest) {
            longest = option.length;
        }
    }
    size = min(longest * 2, config.diameter / (options.length));
    for (let i = 0; i < options.length; i++) {
        if (size * options[i].length > config.diameter - 30) {
            options[i] = options[i].substring(0, floor((config.diameter / 2) / size)) + '...';
        }
    }
}


function onWheelStop() {
    let winner = '';
    const one = TWO_PI / options.length;
    const offset = one / 2 + rotation;
    const a = TWO_PI - HALF_PI;

    for (let i = 0; i < options.length; i++) {
        const start = ((i * one) + offset) % TWO_PI;
        const end = ((i + 1) * one + offset) % TWO_PI;

        console.log('Segment:', start.toFixed(4), end.toFixed(4), options[i]);
        if ((start <= a && a <= end)) {
            winner = options[i];
            break;
        }
    }
    
    console.log('The winner is ' + winner);
}

function draw() {
    translate(width / 2, height / 2);
    background(255);

    let difference = rotateTo - rotation;
    if (abs(difference) > 0.001) {
        rotation += difference * easing; // Ease towards the target
        hasStopped = false; // Reset the flag when the wheel is still moving
    } else if (!hasStopped) {
        rotation = rotateTo; // Snap to the final position
        hasStopped = true;
        onWheelStop(); // Call your function once when the wheel stops
    }

    const one = TWO_PI / options.length;
    for (let i = 0; i < options.length; i++) {
        const offset = rotation + (one / 2)
        const start = i * one + offset;
        const end = (i + 1) * one + offset;
        const middle = start + (one / 2);

        noStroke();
        fill(colors[i % colors.length]);
        arc(0, 0, config.diameter, config.diameter, start, end, PIE);
        textSize(size);
        push();
        rotate(middle);
        textAlign(RIGHT, CENTER);
        noStroke();
        fill(0);
        text(options[i], config.diameter / 2 - 10, 0);
        pop();
    }

    stroke(0);
    line(0, -config.diameter / 2, 0, -config.diameter / 2 + 20);
}

function mousePressed() {
    if (hasStopped) {
        rotateTo = rotation + random(10, 30);
        hasStopped = false;
    }
}

function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
