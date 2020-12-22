let app = require("express")
let http = require("http").Server(app)
let ipAddress = process.argv[2]
let port = process.argv[3]

let socket = require("socket.io-client")(`http://${ipAddress}:${port}`)

let readcommand = require("readcommand")

socket.on("connect", (socket) => {
  console.log(`connected to ${ipAddress} ${port}`)
})

socket.on("event", (data) => {
  console.log(data)
})

socket.on("disconnect", (data) => {
  process.exit(0)
})

socket.on("msg", (data) => {
  console.log(data)
})

readcommand.loop((err, args, str, next) => {
  if (args[0] == "r") {
    console.log("you lost")
    process.exit(0)
  }

  if (args[0] <= 9 && args[0] >= 1) {
    socket.emit("move", (args[0]))
  } else {
    console.log("invalid move, select a number between 1-9")
  }
  return next()
})
