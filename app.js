const app = require("express")();
const chatModel = require("./models/chat.mongoose");
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
var moment = require("moment");
const { schema, normalize } = require("normalizr");
moment().format();
const puerto = 8080;
let users = [];

const author = new schema.Entity("author")
const msg = new schema.Entity("text")
const date = new schema.Entity("date")
const nuevoMsg = new schema.Entity("nuevoMensaje",{
  author,
  msg,
  date
},{idAttribute: "id"});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(`se conecto el usuario ${socket.id}`);

  socket.join(socket.id);
  socket.on("session", (payload) => {
    console.log(payload);
    if (!users.includes(payload)) {
      //users.push(payload.mail);
      users.push(payload); //nl
    }
    io.to(socket.id).emit("userId", {
      sessionId: payload,
      users,
    });
  });

  socket.on("message", (payload) => {
    let nuevoMensaje = {
      author: {
        id: payload.mail,
        nombre: payload.nombre,
        apellido: payload.apellido,
        edad: payload.edad,
        alias: payload.alias,
        avatar: payload.avatar,
      },
      text: payload.msg,
      date: moment().format("L"),
    };

const normalizedMsg = normalize(nuevoMensaje, nuevoMsg)


    io.emit("message", normalizedMsg);

    console.log(normalizedMsg);

    const chatSaved = new chatModel(nuevoMensaje);
    chatSaved.save();
  });
});

io.on("disconnect", (socket) => {
  console.log("se desconecto");
});

http.listen(puerto, () => {
  mongoose
    .connect("mongodb://localhost:27017/test-mongoose", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Servidor esuchando puerto ${puerto}`))
    .catch((err) => console.log(err));
});
