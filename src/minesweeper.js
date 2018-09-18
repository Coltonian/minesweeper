//function to generate a blnk board of a given size to hold the player's guesses
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    let board = [];
    for(let i = 0; i < numberOfRows; i++) {
        let row = [];
        for(let j = 0; j< numberOfColumns; j++) {
          row.push(' ');  
        }
        board.push(row);
    }

    return board;
};

//create a bomb board to check player answers against

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
    let board = [];
    for(let i = 0; i < numberOfRows; i++) {
        let row = [];
        for(let j = 0; j< numberOfColumns; j++) {
          row.push(null);  
        }
        board.push(row);
    }

    let numberOfBombsPlaced = 0;
    while(numberOfBombsPlaced < numberOfBombs){
        let bombRow = Math.floor(Math.random() * numberOfRows);
        let bombColumn = Math.floor(Math.random() * numberOfColumns);
        if(board[bombRow][bombColumn] !== 'B') {
            board[bombRow][bombColumn] = 'B';
            numberOfBombsPlaced++;
        }
    };

    return board;
};

//print and format the game boards
const printBoard = (board) => {
    console.log(board.map(row => row.join(' | ')).join('\n'));
};


//calculate number of adjacent bombs in a single square
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
    let neighborOffsets = [
        [-1, -1], [0, -1], [1, -1],
        [-1, 0], [1, 0],
        [-1, 1], [0, 1], [1, 1]
    ];

    const numberOfRows = bombBoard.length;
    const numberOfColumns = bombBoard[0].length;

    let numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
        let neighborRowIndex = offset[0] + rowIndex;
        let neighborColumnIndex = offset[1] + columnIndex;

        //check to see if neighbor square is a valid square and not outside the parameters of the bombBoard
        if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
            if(bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
                numberOfBombs++;
            }
        }
    });

    return numberOfBombs;
};

//allows a player to flip a tile, which means they will know the number of adjacent bombs to that tile AND they won't be able to choose the tile again
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
    if(playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
    } else if (bombBoard[rowIndex][columnIndex] == 'B') {
        playerBoard[rowIndex][columnIndex] = 'B';
    } else {
        playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
    }
};


//a single turn
let playerBoard = generatePlayerBoard(3, 3);
let bombBoard = generateBombBoard(3, 3, 3);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);

console.log('Updated Player Board: ');
flipTile(playerBoard, bombBoard, 1, 1)
printBoard(playerBoard);

//whiteboard code that does the same as getNumberOfNeighborBombs

/*
const calculateAdjBombs = (bombBoard, playerRow, playerColumn) => {
    let adjacentBombs = 0;
    for(let i = playerRow - 1; i < playerRow + 1; i++) {
        for(let j = playerColumn -1; j < playerColumn + 1; j++) {
            if(bombBoard[i][j] == 'B') {
                adjacentBombs++;
            }
        };
    }

    return adjacentBombs;
};

let bombBoard = generateBombBoard(5, 5, 1);

console.log('Bomb board: ');
printBoard(bombBoard);
console.log(calculateAdjBombs(bombBoard, 1, 1));
 */