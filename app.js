const express = require("express");
const app = require('express')()
const http = require('http').createServer(app);
const io = require('socket.io')(http)
app.use(express.json());
const { dirname } = require("path");
const puerto = 8080;

let productos = [
  {
    id:1,
    title:"leche",
    price:200,
    thumbnail:"leche.png"},
    {
      id:2,
      title:"azucar",
      price:100,
      thumbnail:"azucar.png"
    },
    {
      id:3,
      title:"azucar",
      price:100,
      thumbnail:"azucar.png"
    }
    ,
    {
      id:4,
      title:"azucar",
      price:100,
      thumbnail:"azucar.png"
    },
    {
      id:5,
      title:"azucar",
      price:100,
      thumbnail:"azucar.png"
    }
  ]


app.get('/', (req, res)=>{
  res.sendFile(__dirname+'/index.html')
});

io.on('connection', (socket)=>{
  console.log('se conecto un usuario');
  socket.emit('mensaje', productos)
})

io.on('disconnect', (socket)=>{
  console.log('se desconecto');
})


http.listen(puerto, ()=>{
  console.log(`Servidor esuchando puerto ${puerto}`);
})