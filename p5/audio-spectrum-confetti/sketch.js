
var config = {
    palette: 'happy',
    sample: 1024,
    realStart: 0,
    threshold: 20,
    debug: false,
};
config.bins = COLOR_PALETTES[config.palette].length * 3;
config.realEnd = config.sample - (config.sample / 2);
config.levels = (config.realEnd - config.realStart) / config.bins;

const explosions = [];
const previous = Array.from({ length: config.bins }).fill([]);

let sound, amp, fft;
let size;


function preload() {
    sound = loadSound('../../assets/audio/JVKE  this is what space feels like Official Lyric Video.mp3');
}

function setup() {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);

    size = (min(width, height) / 2 - 100) / config.bins;

    fft = new p5.FFT();
    amp = new p5.Amplitude();
    sound.setVolume(0.5)
}


function draw() {
    background(33);
    const spectrum = fft.analyze(config.sample);

    if (config.debug) {
        stroke(255);
        strokeWeight(2);
        for (let i = config.realStart; i < config.realEnd; i++) {
            rect(i, 0, 1, spectrum[i]);
        }
    }

    noStroke();
    fill(33);
    rect(0, 0, 35, 30);
    fill(255);
    text(frameRate().toFixed(), 10, 20);

    translate(width / 2, height / 2);

    for (let i = explosions.length - 1; i >= 0; i--) {
        if (explosions[i].finished) {
            explosions.splice(i, 1);
            continue;
        }

        explosions[i].show();
        explosions[i].update();
    }

    for (let i = 0; i < config.bins; i++) {
        const index = floor(map(i, 0, config.bins, config.realStart, config.realEnd));
        let levelSUM = 0;
        for (let j = index; j < index + config.levels; j++) {
            levelSUM += spectrum[i];
        }
        const levelAVG = map(levelSUM / config.levels, 0, 255, 0, 1);
        previous[i].push(levelAVG);
        if (previous[i].length > config.threshold) previous[i].splice(0, 1);
        let previousSUM = 0;
        for (const prev of previous[i]) {
            previousSUM += prev;
        }
        const previousAVG = previousSUM / previous[i].length;

        if (levelAVG > previousAVG + map(i, 0, config.bins, 0.15, 0.01)) {
            const time = config.bins - (i + 1);
            const level = ceil(map(levelAVG, 0, 1, 1, 10));
            for (let j = 0; j < level; j++) {
                const c = COLOR_PALETTES[config.palette][i % (COLOR_PALETTES[config.palette].length)].rgba;
                const iTimes = time * size;
                const r = random(iTimes, iTimes + 25);
                const p = p5.Vector.random2D().mult(r);
                const vel = map(levelAVG, 0, 1, 1, map(i, 0, config.bins, 10, 1));
                explosions.push(new Explosion(
                    p,
                    c,
                    2 + i,
                    3,
                    max(5, (config.bins - i) / 2),
                    vel
                ));
            }
        }
    }
}

function mousePressed() {
    if (sound.isPlaying()) sound.pause();
    else sound.play();
}

function windowResized() {
    setup();
}
