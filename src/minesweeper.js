//Building a js class for the game play of Minesweeper
class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

    playMove(rowIndex, columnIndex) {
        this._board.flipTile(rowIndex, columnIndex);
        if(this._board.playerBoard[rowIndex][columnIndex] === 'B') {
            console.log("Game over!  You lose!");
            this._board.print();
        } else if (!this._board.hasSafeTiles()) {
            console.log("You win!  Awesome!");
        } else {
            console.log("Current Board:");
            this._board.print();
        }
    }
}



//Building a js class for a game board
class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs;
        this._numberOfRows = numberOfRows;
        this._numberOfColumns = numberOfColumns;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }
    
    get playerBoard() {
        return this._playerBoard;
    }

    //allows a player to flip a tile, which means they will know the number of adjacent bombs to that tile AND they won't be able to choose the tile again
    flipTile(rowIndex, columnIndex) {
        if(this._playerBoard[rowIndex][columnIndex] !== ' ') {
            console.log('This tile has already been flipped!');
            return;
        } else if (this._bombBoard[rowIndex][columnIndex] == 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        }

        this._numberOfTiles--
    }

    //calculate number of adjacent bombs in a single square
    getNumberOfNeighborBombs(rowIndex, columnIndex) {
        let neighborOffsets = [
            [-1, -1], [0, -1], [1, -1],
            [-1, 0], [1, 0],
            [-1, 1], [0, 1], [1, 1]
        ];

        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;

        let numberOfBombs = 0;

        neighborOffsets.forEach(offset => {
            let neighborRowIndex = offset[0] + rowIndex;
            let neighborColumnIndex = offset[1] + columnIndex;

            //check to see if neighbor square is a valid square and not outside the parameters of the bombBoard
            if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                if(this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
                    numberOfBombs++;
                }
            }
        });

        return numberOfBombs;
    }

    //checks if there are safe tiles (ie. non-bomb tiles) remaining to be selected
    hasSafeTiles() {
        return this._numberOfTiles !== this._numberOfBombs;
    }

    //print and format the game boards
    print() {
        console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    }

    //function to generate a blnk board of a given size to hold the player's guesses
    static generatePlayerBoard(numberOfRows, numberOfColumns) {
        let board = [];
        for(let i = 0; i < numberOfRows; i++) {
            let row = [];
            for(let j = 0; j< numberOfColumns; j++) {
            row.push(' ');  
            }
            board.push(row);
        }

        return board;
    }

    //create a bomb board to check player answers against

    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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
    }

}


//a single turn
const g = new Game(3, 3, 3);
g.playMove(0, 0);