const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
var moment = require('moment'); // require
moment().format(); 
const fs = require("fs");
const puerto = 8080;
const {sqlite3Connect} = require('./DB/sqlite3.db')
const knex = require('knex')(sqlite3Connect)


//creacion de tabla

/*knex.schema.createTable('chat', table =>{
  table.string('from',50)
  table.string('msg',100)
  table.string('date',50)
})
.then(()=> console.log('creado'))
.catch((err) => console.log(err))
.finally(()=> knex.destroy())*/


let users = [];



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(`se conecto el usuario ${socket.id}`);

  socket.join(socket.id)
  socket.on("session", (payload) => {
    if (!users.includes(payload.mail)) {
      users.push(payload.mail);
    }
    io.to(socket.id).emit("userId", {
      sessionId: payload.mail,
      users,
    });
  });

  socket.on("message", (payload) => {
    let nuevoMensaje = {
      from: payload.mail,
      msg: payload.msg,
      date: moment().format('L')
    }
    io.emit("message", nuevoMensaje);
    knex('chat').insert(nuevoMensaje)
    .then(()=>console.log("mensaje guardado"))
    .catch((err)=>console.log(err))
    .finally(()=>knex.destroy())
    
  });


});

io.on("disconnect", (socket) => {
  console.log("se desconecto");
});

http.listen(puerto, () => {
  console.log(`Servidor esuchando puerto ${puerto}`);
});