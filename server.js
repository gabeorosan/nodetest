const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require("socket.io")(server)
const board = require("./board")

let userCount = 0
let users = [null, null]

let userTurn = 0

let won = false

io.on("connection", (socket) => {

    userCount++
    users[userCount - 1] = socket


    if (userCount == 2) {
        board.showboard(function(data) {
        io.emit("msg", data)
        })
        users[0].emit("event", `Game started. You are player 1.`)
        users[1].emit("event", `Game started. You are player 2.`)
        users[0].emit("event", `Your turn`)
    }

    socket.on("move", (msg) => {
   
    if (won) {
      socket.emit("msg", "Game Over! ")
    } 
    else if (socket.id != users[userTurn].id) {
      socket.emit("msg", "it's not your turn")
    } 
    else {
      let moveReturn = board.move(users[0].id == socket.id ? "X" : "O", msg)

      if (moveReturn == "") {
        userTurn = (userTurn + 1) % 2

        board.showboard((data) => {
          io.emit("msg", data)
        })

        users[userTurn].emit("msg", "your turn")
      } else {
        if (moveReturn.includes("won") || moveReturn.includes("draw")) {
          io.emit("msg", moveReturn)
          won = true
          users[0].disconnect()
          users[1].disconnect()
          userCount = 0
          users = [null, null]
          board.clear()
        } else socket.emit("msg", moveReturn)
      }
    }
  })
  socket.on("disconnect", () => {
    if (won == false) {
      io.emit("msg", `Your opponent resigned, you win!`)
      users[0].disconnect()
      users[1].disconnect()
      board.clear()
    }
    userCount = 0
    won = false
    userTurn = 0
  })
})

server.listen(process.argv[2],() => {
  console.log("connected to " + process.argv[2])
})
