let board = [".", ".", ".", ".", ".", ".", ".", ".", "."]
let count = 0
winner = "null"

exports.clear = () => {
    board = [".", ".", ".", ".", ".", ".", ".", ".", "."]
    winner = "null"
    count = 0
}

exports.showboard = cb => {
    let output = "\n"
  
    for (i = 0; i < board.length; i++) {
      output += board[i]
      output += "  "
      if ((i + 1) % 3 == 0) output += "\n"
    }
    cb(output)
}

exports.move = (player, position) => {
    
    if (count >= 9) {
      return "Game is already over"
    } 
    else if (board[position - 1] != ".") {
      return "invalid move"
    } 
    else {
      board[position - 1] = player == "X" ? "X" : "O"
      count++
      if (checkWin()) {
        winner = player ? 1 : 2
        return `Game won by player ${winner}`
      } else if (count >= 9) {
        return "Game is tied"
      } else {
        return ""
      }
    }
  }

  checkWin = () => {
    let b = board
    if (
      (b[0] == b[1] && b[1] == b[2] && b[2] != ".") ||
      (b[3] == b[4] && b[4] == b[5] && b[5] != ".") ||
      (b[6] == b[7] && b[7] == b[8] && b[8] != ".")
    ) {
      return true
    } else if (
      (b[0] == b[3] && b[3] == b[6] && b[6] != ".") ||
      (b[1] == b[4] && b[4] == b[7] && b[7] != ".") ||
      (b[2] == b[5] && b[5] == b[8] && b[8] != ".")
    ) {
      return true
    } else if (
      (b[0] == b[4] && b[4] == b[8] && b[8] != ".") ||
      (b[2] == b[4] && b[4] == b[6] && b[6] != ".")
    ) {
      return true
    }
    return false
  }
  