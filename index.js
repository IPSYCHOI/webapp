const express = require('express');
const http = require('http');
const soketIo = require('socket.io')
let users=[]
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
app.post("/add",(req,res)=>{
    const user=req.body.userName
    if(user){
        users.push(user)
    }
    res.status(200).json({
        users
    })
})
app.get("/",(req,res)=>{
    res.status(200).json({
        users
    })
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