const express = require('express');
const http = require('http');
const soketIo = require('socket.io')
require("dotenv").config()

const app =express()
const server = http.createServer(app)
const io = soketIo(server,()=>{
    cors:{
        origin:"*"
    }
})
server.listen(3000,"0.0.0.0",()=>{
    console.log("listen on http://localhost:3000")
})
app.use(express.json())
app.post("/send",(req,res)=>{
    const text = req.body.text
    io.emit("alert",{text})
    res.send("message sent")
})
io.on("connection",(s)=>{
    console.log("connected")
    s.on("disconnect",()=>{
        console.log("disconnected")
    })
})