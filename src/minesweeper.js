


const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
    for(let i = 0; i < numberOfRows; i++){
      let row = [];
      for(let j = 0; j < numberOfColumns; j++){
        row.push(' ');
      }
    board.push(row);
    }

  return board;
};


const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
      for(let i = 0; i < numberOfRows; i++){
        let row = [];
        for(let j = 0; j < numberOfColumns; j++){
          row.push(null);
        }
      board.push(row);
      }

  let numberOfBombsPlaced = 0;
      while(numberOfBombsPlaced <= numberOfBombs){
        let randomRowIndex = Math.floor(Math.random()*numberOfRows);
        let randomColumnIndex = Math.floor(Math.random()*numberOfColumns );
          if(board[randomRowIndex][randomColumnIndex] !== 'B'){
            board[randomRowIndex][randomColumnIndex] = 'B';
            numberOfBombsPlaced++;
          }
      }

  return board;
};


const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
    const neighborOffsets = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
    const numberOfRows = bombBoard.length;
    const numberOfColumns = bombBoard[1].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach((offset) => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
        if(neighborRowIndex >= 0 && neighborColumnIndex >= 0 &&
           neighborRowIndex < numberOfRows && neighborColumnIndex < numberOfColumns){
             if(bombBoard[neighborRowIndex][neighborColumnIndex] == 'B'){
               return numberOfBombs++;
             }
           }
    });
    return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if(playerBoard[rowIndex][columnIndex] !== ' '){
    console.log('This tile has already been flipped!');
    return;
  }else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  }else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};


let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 4);

let printBoard = (board) => {
  return board.map(row => row.join(' | ')).join('\n');
};

console.log('Player board: \n'+ printBoard(playerBoard));
console.log('Bomb Board: \n'+ printBoard(bombBoard));

flipTile(playerBoard, bombBoard, 0,0);
console.log('Updated Player Board: ');
console.log('Player board: \n'+ printBoard(playerBoard));
