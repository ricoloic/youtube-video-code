var config = {
    length: 100,
};

let endIndex = config.length - 1;
let currentIndex = 0;

let list;
let swap = false;
const size = 5;

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);
    list = Array.from({ length: config.length - 1 }).map(() => floor(random(0, 100)));
    console.log(list);
}

function draw() {
    background(33);

    strokeWeight(size);
    for (let i = 0; i < list.length; i++) {
        if (currentIndex === i) {
            stroke(230, 67, 120);
        } else {
            stroke(255);
        }
        line(i * size, 0, i * size, list[i]);
    }

    if (list[currentIndex] > list[currentIndex + 1]) {
        const temp = list[currentIndex + 1];
        list[currentIndex + 1] = list[currentIndex];
        list[currentIndex] = temp;
        swap = true;
    }

    currentIndex++;

    if (currentIndex === endIndex) {
        endIndex--;
        currentIndex = 0;
        if (!swap) noLoop();
        swap = false;
    }
}

function bubble(list) {
    for (let i = list.length - 1; i >= 0; i--) {
        let swap = false;
        for (let j = 0; j < i; j++) {
            if (list[j] > list[j + 1]) {
                const temp = list[j + 1];
                list[j + 1] = list[j];
                list[j] = temp;
                swap = true;
            }
        }
        if (!swap) break;
    }
}


function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
