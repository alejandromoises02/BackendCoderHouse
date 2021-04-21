const app = require("express")();
const chatModel = require('./models/chat.mongoose');
const mongoose = require('mongoose');
const http = require("http").createServer(app);
const io = require("socket.io")(http);
var moment = require('moment'); 
const cookieParser = require('cookie-parser')
const session = require('express-session')
moment().format(); 
const puerto = 8080;
const redis = require('redis')
const client = redis.createClient()
const RedisStore = require('connect-redis')(session)
let users = [];
app.use(cookieParser())
app.use(session({

  store: new RedisStore({
    host:'localhost',
    port: 6379,
    client: client,
    ttl: 600
  }),
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))


app.get("/", (req, res) => {
  res.clearCookie("logoff")
  if(!req.cookies.login){
    res.sendFile(__dirname + "/index.html");
  }
  else if(req.cookies.login==="true"){
    res.sendFile(__dirname + "/index.html");
    res.cookie("login","true",{maxAge: 60000})
  }
});



app.get("/login", (req, res) => {
  if(!req.query.username || !req.query.password){
    res.sendStatus(400);
  }else if(req.query.username === "ale@gmail.com" && req.query.password === "12345"){
    res.cookie("login","true",{maxAge: 60000})
    res.sendFile(__dirname + "/chat.html");
  }else{
    res.sendStatus(400);
  }
})

app.get("/clr", (req, res) => {
  res.clearCookie("login")
  res.cookie("logoff","true",{maxAge: 2000})
  res.send("logoff")
})

app.get('/loggin-session', (req,res) =>{
  if(!req.query.username || !req.query.password){
    res.sendStatus(400);
  }else if(req.query.username === "ale@gmail.com" && req.query.password === "12345"){
    res.session.user = req.query.username;
    res.session.admin = true;
    res.send('login success')
  }else{
    res.sendStatus(400);
  }
})

io.on("connection", (socket) => {
  console.log(`se conecto el usuario ${socket.id}`);

  socket.join(socket.id)
  socket.on("session", (payload) => {
    if (!users.includes(payload)) {
      users.push(payload);
    }
    io.to(socket.id).emit("userId", {
      sessionId: payload.mail,
      nombre: payload.nombre,
      pass: payload.pass,
      users,
    });
  });

  socket.on("message", (payload) => {
    let nuevoMensaje = {
      from: payload.mail,
      nombre: payload.nombre,
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