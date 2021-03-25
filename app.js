const app = require("express")();
const chatModel = require('./models/chat.mongoose');
const mongoose = require('mongoose');
const http = require("http").createServer(app);
const io = require("socket.io")(http);
var moment = require('moment'); 
moment().format(); 
const puerto = 8080;
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
    const chatSaved = new chatModel(nuevoMensaje)
    chatSaved.save()
  });


});

io.on("disconnect", (socket) => {
  console.log("se desconecto");
});



http.listen(puerto, () => {
  mongoose.connect('mongodb://localhost:27017/test-mongoose',
      {
          useNewUrlParser: true,
          useUnifiedTopology: true
      }
  )
      .then( () => console.log(`Servidor esuchando puerto ${puerto}`))
      .catch( (err) => console.log(err));
})

