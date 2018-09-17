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


//start a new game
let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);
