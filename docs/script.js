const grid = document.getElementById("sudoku-grid");

let board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

function createGrid() {
    for (let i = 0; i < 9; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 9; j++) {
            let cell = document.createElement("td");
            let input = document.createElement("input");
            input.type = "text";
            input.maxLength = "1";

            if (board[i][j] !== 0) {
                input.value = board[i][j];
                input.disabled = true;
            }

            input.oninput = function () {
                validateInput(input, i, j);
            };

            cell.appendChild(input);
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

function validateInput(input, row, col) {
    let value = parseInt(input.value);
    if (isNaN(value) || value < 1 || value > 9 || !isValid(board, row, col, value)) {
        input.classList.add("wrong");
        input.classList.remove("correct");
    } else {
        input.classList.add("correct");
        input.classList.remove("wrong");
    }
}

function isValid(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) return false;
    }

    let startRow = row - row % 3, startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) return false;
        }
    }
    return true;
}

function solveSudokuHelper(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudokuHelper(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function solveSudoku() {
    solveSudokuHelper(board);
    updateGrid();
}

function updateGrid() {
    let rows = document.querySelectorAll("tr");
    rows.forEach((row, i) => {
        row.querySelectorAll("input").forEach((input, j) => {
            input.value = board[i][j];
            input.classList.remove("wrong");
            input.classList.add("correct");
        });
    });
}

function resetGrid() {
    document.querySelectorAll("input").forEach(input => {
        if (!input.disabled) {
            input.value = "";
            input.classList.remove("wrong", "correct");
        }
    });
}

createGrid();
