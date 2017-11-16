// const blankLine = '  |   |  ';
// const guesLine = '1 |   |  ';
// const bombLine = '  | B |  ';
// console.log('This is what an empty board would look like:');
// console.log(blankLine);
// console.log(blankLine);
// console.log(blankLine);
// console.log('This is what a board with a guess and a bomb on it would look like:');
// console.log(guesLine);
// console.log(bombLine);
// console.log(blankLine);
const printBoard = (board) => {
  console.log('Current Board:');
  console.log(board[0].join(' | '));
  console.log(board[1].join(' | '));
  console.log(board[2].join(' | '));
};
let board = [
             [' ', ' ', ' '],
             [' ', ' ', ' '],
             [' ', ' ', ' ']
            ];
printBoard(board);

board[0][1] = '1';
board[2][2] = 'B';

printBoard(board);
