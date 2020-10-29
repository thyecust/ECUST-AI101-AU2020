# 8 Puzzle Problem

> author: thy[AT]mail.ecust.edu.cn.

## Background

**8 Puzzle Problem**, also known as Slider Problem, is a famous search algorithm problem.

There is a 3×3 grid, with 8 squares labeled 1 through 8, plus a blank square.

The goal is to rearrange the tiles so that they are in row-major order, using as few moves as possible.

![8puzzle 4 moves](https://coursera.cs.princeton.edu/algs4/assignments/8puzzle/4moves.png)

> image source: https://coursera.cs.princeton.edu/algs4/assignments/8puzzle/specification.php

We will solve it by **BFS** and **A***, in JavaScript.

### Input

Input are string such as `0123456789` . You can use regex to make sure its validity

```js
inputStr = inputStr.replace(/[^0-9]/g, '');
```

for example

```js
> inputStr = "[1,2,3; 4 5 6; 7, 8, 9.]"
< "[1,2,3; 4 5 6; 7, 8, 9.]"
> inputStr.replace(/[^0-9]/g,'')
< "123456789"
```

### Matrix class

```js
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
```

test

```js
let m1 = new Matrix(3, 3, "012345678");
console.log(m1.elems);
m1.zeroDown();
console.log(m1.elems);
m1.zeroRight();
console.log(m1.elems);
```

## Breadth First Search (BFS)



## A* Search

### Hamming and Manhattan distances

To use heuristic algorithms such as A*, we need well-defined distances, such as Hamming and Manhattan distances.

* **Hamming distance**: the number of tiles in the wrong position.
* **Manhattan distance**: the sum of Manhattan distances from the tiles to their goal position.

### A* Search

We define a **search node** to be

* a board
* the number of moves made to reach the board
* the previous search node

A* algorithm:

1. add the initial search node into a **Priority Queue**
2. delete from the PQ the search node with the minimum priority
3. insert onto the PQ all neighboring search nodes
4. repeat this procedure until search node dequeued is the goal board

Choice of Priority function:

* Hamming priority function: [Hamming distance of a board] + [number of moves made]
* Manhattan priority function: [Manhattan distance of a board] + [number of moves made]

Optimizer:

* Delete replication
* Save priority

## Solvability

Some input is unsolvable, such as

![无法解决的滑块难题](https://coursera.cs.princeton.edu/algs4/assignments/8puzzle/unsolvable.png)

> picture source: https://coursera.cs.princeton.edu/algs4/assignments/8puzzle/specification.php

You can prove: if a board with a pair of tiles swapped is solvable, then itself is unsolvable.

Refer to https://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html.

