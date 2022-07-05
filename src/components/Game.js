const size = 4;
const probOfTwo = 0.9;

let getEmptyBoard = () => {
    let emptyBoard = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    return emptyBoard;
};


let hasValue = function(board, value) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === value)
                return true;
        }
    }
    return false;
}


let isFull = function(board) {
    return !hasValue(board, 0);
}


let getRandomPosition = function() {
    const rowPos = Math.floor(Math.random() * size);
    const colPos = Math.floor(Math.random() * size);
    return [rowPos, colPos];
}


let fillWithTwo = () => {
    return Math.random() <= probOfTwo;
}


let getEmptyRandomPosition = function(board) {
    if (isFull(board))
        return board;

    let [r, c] = getRandomPosition();
    while (board[r][c] !== 0) {
        [r, c] = getRandomPosition();
    }

    let isTwo = fillWithTwo();
    if (isTwo)
        board[r][c] = 2;
    else
        board[r][c] = 4;

    return board;
}


let compress = function(board) {
    const newBoard = getEmptyBoard();

    for (let i = 0; i < board.length; i++) {
        let colIndex = 0;

        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] !== 0) {
                newBoard[i][colIndex] = board[i][j]
                colIndex++;
            }
        }
    }
    return newBoard;
}

let merge = function(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] !== 0 && board[i][j] === board[i][j + 1]) {
                board[i][j] = 2 * board[i][j];
                board[i][j + 1] = 0;
            }
        }
    }
    return board;
}

let reverse = function(board) {
    const reversedBoard = getEmptyBoard();

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            reversedBoard[i][j] = board[i][size - 1 - j];
        }
    }
    return reversedBoard;
}

let moveLeft = function(board) {
    const comressedBoard = compress(board)
    let merged = merge(comressedBoard)
    return compress(merged);
}

let moveRight = function(board) {
    let reversedBoard = reverse(board);
    let merged = moveLeft(reversedBoard);
    return reverse(merged);
}

let rotateLeft = function(board) {
    let rotatedBoard = getEmptyBoard();

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            rotatedBoard[i][j] = board[j][size - i - 1];
        }
    }
    return rotatedBoard;
}

let rotateRight = function(board) {
    let rotatedBoard = getEmptyBoard();

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            rotatedBoard[i][j] = board[size - 1 - j][i];
        }
    }
    return rotatedBoard;
}

let moveUp = function(board) {
    let rotatedBoard = rotateLeft(board)
    const merged = moveLeft(rotatedBoard);
    return rotateRight(merged);
}

let moveDown = function(board) {
    let rotatedBoard = rotateRight(board);
    const merged = moveLeft(rotatedBoard);
    return rotateLeft(merged);
}

let checkWin = function(board) {
    return hasValue(board, 2048);
}

let hasDifference = function(board, updatedBoard) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] !== updatedBoard[i][j])
                return true;
        }
    }
    return false;
}
let isGameOver = function(board) {
    if (hasDifference(board, moveLeft(board)))
        return false;

    if (hasDifference(board, moveRight(board)))
        return false;

    if (hasDifference(board, moveUp(board)))
        return false;

    if (hasDifference(board, moveDown(board)))
        return false;

    return true;
}
export { getEmptyRandomPosition, getEmptyBoard, isFull, moveLeft, moveRight, moveDown, moveUp, isGameOver, checkWin };