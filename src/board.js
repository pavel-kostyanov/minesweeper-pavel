

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  //*********************************************
  print(){
      console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }
  //*********************************************
  static generatePlayerBoard(numberOfRows, numberOfColumns){
    let board = [];
      for(let i = 0; i < numberOfRows; i++){
        let row = [];
        for(let j = 0; j < numberOfColumns; j++){
          row.push(' ');
        }
      board.push(row);
      }

    return board;
  }
  //*********************************************
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
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
  //*********************************************
  get playerBoard(){return this._playerBoard}
  get bombBoard(){return this._bombBoard}
  //*********************************************
  flipTile(rowIndex, columnIndex){
    if(this._playerBoard[rowIndex][columnIndex] !== ' '){
      console.log('This tile has already been flipped!');
      return;
    }else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    }else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }
  //*********************************************
  getNumberOfNeighborBombs(rowIndex, columnIndex){
      const neighborOffsets = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
      const numberOfRows = this._bombBoard.length;
      const numberOfColumns = this._bombBoard[1].length;
      let numberOfBombs = 0;

      neighborOffsets.forEach((offset) => {
        const neighborRowIndex = rowIndex + offset[0];
        const neighborColumnIndex = columnIndex + offset[1];
          if(neighborRowIndex >= 0 && neighborColumnIndex >= 0 &&
             neighborRowIndex < numberOfRows && neighborColumnIndex < numberOfColumns){
               if(this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B'){
                 return numberOfBombs++;
               }
             }
      });
      return numberOfBombs;
  }
  //*********************************************
  hasSafeTiles(){
    return (this._numberOfTiles !== this._numberOfBombs);
  }


}//** end of class Board
module.exports = Board;
