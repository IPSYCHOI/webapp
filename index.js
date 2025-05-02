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
    console.log("test")
})
io.on("connection",(s)=>{
    console.log("connected")

    s.on('sendMessage', (message) => {
        console.log('Message received from client:', message.text);
        // You can now handle the message, for example, broadcast it to other clients:
        io.emit('alert', { text: message.text });
      });
    s.on("disconnect",()=>{
        console.log("disconnected")
    })
})