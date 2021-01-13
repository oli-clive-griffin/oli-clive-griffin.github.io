document.addEventListener('DOMContentLoaded', setGame)


// Define your `board` object here!

var board = {
  cells: []
}

function setGame () {
  board.cells = []
  document.getElementsByClassName("board")[0].innerHTML = ""

  let chosenNumber = 3
  if (document.getElementById("boardSize").value) {
    chosenNumber = document.getElementById("boardSize").value
  }
  // let chosenNumber = document.getElementById("quantity").value
  createBoard(chosenNumber)

  lib.initBoard()
  //Don't remove this function call: it makes the game work!
  
  countMines()
  
  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)
}

function createBoard (sideLength) {
  console.log(sideLength)
  for (let i = 0; i < sideLength; i++) {
    for (let j = 0; j < sideLength; j++) {
      board.cells.push ({
        row: i,
        col: j,
        isMine: determineIsMine(),
        hidden: true,
        isMarked: false,
      })
    }
  }
}

function determineIsMine() {
  return (Math.random() >= 0.8)
}

function countMines () {
  for (let i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
}


function checkForWin () {
  for (let i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine == false && board.cells[i].hidden == true) return false
    if (board.cells[i].isMine == true && board.cells[i].isMarked == false) return false
  }

  return lib.displayMessage('You win!')
}




function countSurroundingMines (cell) {
  let surrounding = lib.getSurroundingCells(cell.row, cell.col)

  let count = 0

  for (let i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine) {
      count++
    }
  }
  // another working solution
  // count = surrounding.filter((obj) => obj.isMine === true).length

  // even better solution
  // count = surrounding.reduce((acc, cur) => cur.isMine ? ++acc : acc, 0)

  return count
}

