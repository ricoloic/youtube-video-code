var config = {
    scl: 50,
};

const grid = [];

let cols, rows, scl;

let current = [0, 0];

const trail = [];

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    scl = config.scl;
    cols = floor(width / scl);
    rows = floor(height / scl);

    for (let col = 0; col < cols; col++) {
        grid[col] = [];
        for (let row = 0; row < rows; row++) {
            grid[col][row] = {
                visited: col === 0 && row === 0,
                backed: false,
                top: true,
                bottom: true,
                left: true,
                right: true,
            };
        }
    }
}

function draw() {
    background(255);

    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            const cell = grid[col][row];
            const x = col * scl;
            const y = row * scl;
            noStroke();
            if (cell.visited) {
                fill(200, 67, 130);
            } else {
                fill(162, 200, 55);
            }
            rect(x, y, scl, scl);
            stroke(0);
            strokeWeight(3);
            if (cell.top) line(x, y, x + scl, y);
            if (cell.right) line(x + scl, y, x + scl, y + scl);
            if (cell.bottom) line(x + scl, y + scl, x, y + scl);
            if (cell.left) line(x, y + scl, x, y);
        }
    }

    if (current === undefined) {
        noLoop();
        return;
    }

    next();
}

function next() {
    let n = [];
    const col = current[0];
    const row = current[1];
    if (col - 1 >= 0) n.push([col - 1, row]);
    if (col + 1 < cols) n.push([col + 1, row]);
    if (row - 1 >= 0) n.push([col, row - 1]);
    if (row + 1 < rows) n.push([col, row + 1]);
    n = getUnvisited(n);

    if (n.length === 0) {
        // Go back on your trail
        current = trail.pop();

        if (current) {
            grid[current[0]][current[1]].backed = true;
        }
    } else {
        const last = current;
        trail.push(last);
        current = random(n);
        grid[current[0]][current[1]].visited = true;

        if (current[0] < last[0]) {
            grid[current[0]][current[1]].right = false;
            grid[last[0]][last[1]].left = false;
        } else if (current[0] > last[0]) {
            grid[current[0]][current[1]].left = false;
            grid[last[0]][last[1]].right = false;
        } else if (current[1] < last[1]) {
            grid[current[0]][current[1]].bottom = false;
            grid[last[0]][last[1]].top = false;
        } else if (current[1] > last[1]) {
            grid[current[0]][current[1]].top = false;
            grid[last[0]][last[1]].bottom = false;
        }
    }
}

function getUnvisited(n) {
    const unvisited = [];
    for (let i = 0; i < n.length; i++) {
        if (!grid[n[i][0]][n[i][1]].visited) {
            unvisited.push(n[i]);
        }
    }
    return unvisited;
}


function keyPressed() {
    if (keyCode === 32) {
        saveCanvas("print.png");
    }
}
