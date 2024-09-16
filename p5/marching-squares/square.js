class Square {
    constructor(
        x, y,
        scl,
        values,
    ) {
        this.x = x;
        this.y = y;
        this.values = values;
        this.scl = scl;
        this.lines = [];
    }

    static lerp(t, v1, v2) {
        return map(t, v1, v2, 0, 1);
    }

    calculate(t) {
        const tl = !!this.values[0][0];
        const tr = !!this.values[1][0];
        const br = !!this.values[2][0];
        const bl = !!this.values[3][0];
        const tlV = this.values[0][1];
        const trV = this.values[1][1];
        const brV = this.values[2][1];
        const blV = this.values[3][1];

        const amt1 = Square.lerp(t, tlV, blV);
        const left = createVector(this.x, lerp(this.y, this.y + this.scl, amt1));
        const amt2 = Square.lerp(t, blV, brV);
        const bottom = createVector(lerp(this.x, this.x + this.scl, amt2), this.y + this.scl);
        const amt3 = Square.lerp(t, trV, brV);
        const right = createVector(this.x + this.scl, lerp(this.y, this.y + this.scl, amt3));
        const amt4 = Square.lerp(t, tlV, trV);
        const top = createVector(lerp(this.x, this.x + this.scl, amt4), this.y);

        if ((!tl && !tr && !br && bl) || (tl && tr && br && !bl)) { // case 1 & case 14
            this.lines.push([left, bottom]);
        } else if ((!tl && !tr && br && !bl) || (tl && tr && !br && bl)) { // case 2 & case 13
            this.lines.push([bottom, right]);
        } else if ((!tl && !tr && br && bl) || (tl && tr && !br && !bl)) { // case 3 & case 12
            this.lines.push([left, right]);
        } else if ((!tl && tr && !br && !bl) || (tl && !tr && br && bl)) { // case 4 & case 11
            this.lines.push([top, right]);
        } else if (!tl && tr && !br && bl) { // case 5
            this.lines.push([top, left]);
            this.lines.push([bottom, right]);
        } else if ((!tl && tr && br && !bl) || (tl && !tr && !br && bl)) { // case 6 & case 9
            this.lines.push([top, bottom]);
        } else if ((!tl && tr && br && bl) || (tl && !tr && !br && !bl)) { // case 7 & case 8
            this.lines.push([left, top]);
        } else if (tl && !tr && br && !bl) { // case 10
            this.lines.push([bottom, left]);
            this.lines.push([top, right]);
        }
    }

    show() {
        for (const l of this.lines) {
            line(l[0].x, l[0].y, l[1].x, l[1].y);
        }
    }
}