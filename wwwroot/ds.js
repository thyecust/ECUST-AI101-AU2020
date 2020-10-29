class Matrix {
    constructor(width, height, inputStr) {
        /*
         * @require: inputStr is string such as 012345678,
                     width and height are integer > 0,
                     len(inputStr) == width*height.
         * @ensure: elems[i * width + j] == "0",
                    i in [0, 1, ..., width - 1],
                    j in [0, 1, ..., height - 1].
         */
        this.width = width;
        this.height = height;
        this.elems = Array.from(inputStr);
        let cord0 = this.elems.indexOf("0");
        this.j = cord0 % width;
        this.i = cord0 - width * this.j;
    }
    
    get(i, j) {
        return this.elems[i * this.width + j];
    }
    
    set(i, j, k) {
        this.elems[i * this.width + j] = k;
    }
    
    isEqualTo(matrix2) {
        return JSON.stringfy(this.elems) == JSON.stringfy(matrix2.eles);
    }
    
    zeroUp() {
        if (this.i == 0) return;
        this.set(this.i, this.j, this.get(this.i-1, this.j));
        this.set(this.i-1, this.j, "0");
        this.i--;
    }
    
    zeroDown() {
        if (this.i == this.height-1) return;
        this.set(this.i, this.j, this.get(this.i+1, this.j));
        this.set(this.i+1, this.j, "0");
        this.i++;
    }
    
    zeroLeft() {
        if (this.j == 0) return;
        this.set(this.i, this.j, this.get(this.i, this.j-1));
        this.set(this.i, this.j-1, "0");
        this.j--;
    }
    
    zeroRight() {
        if (this.j == this.width-1) return;
        this.set(this.i, this.j, this.get(this.i, this.j+1));
        this.set(this.i, this.j+1, "0");
        this.j++;
    }
}

class Node {
    constructor(matrix, moves, predecessor=null) {
        this.matrix = matrix;
        this.moves = moves;
        this.mahattan = getMahattan(matrix);
        this.score = this.moves + this.mahattan;
        this.predecessor = predecessor;
    }
}

function getMahattan(matrix) {
    let getMahattanByPoints = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);
    let getCordInMatrix = (n) => {
        let p = matrix.elems.indexOf(n);
        let j = p % matrix.width;
        let i = p - matrix.width * j;
        return [i, j];
    }
    let score = 0;
    for (let i = 0; i < matrix.height; i++) {
        for (let j = 0; j < matrix.width; j++) {
            [x1, y1] = getCordInMatrix(i+j);
            score += getMahattanByPoints(x1, y1, i, j);
        }
    }
    return score;
}