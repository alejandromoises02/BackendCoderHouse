const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
var moment = require('moment'); // require
moment().format(); 
const fs = require("fs");
const puerto = 8080;

//Manejo de archivos

class Archivo {
  constructor(nombre) {
    this.nombre = "./" + nombre + ".txt";
  }

  async leer() {
    try {
      const chat = await fs.promises.readFile(this.nombre, "utf-8");
      return JSON.parse(chat);
    } catch (error) {
      return [];
    }
  }

  async guardar(mensaje) {
    
    const nuevoMensaje = {
      msg: mensaje
    };

    let lista = await this.leer();
    lista.push(nuevoMensaje);

    try {
      const aux = await fs.promises.writeFile(
        this.nombre,
        JSON.stringify(lista)
      );
    } catch (error) {
      console.log("No se pudo escribir en el archivo");
    }
    return nuevoMensaje
  }

  
}

const miArchivo = new Archivo("productos");
//Manejo de archivos



let users = [];

let productos = [
  {
    id: 1,
    title: "leche",
    price: 200,
    thumbnail: "leche.png",
  },
  {
    id: 2,
    title: "azucar",
    price: 100,
    thumbnail: "azucar.png",
  },
  {
    id: 3,
    title: "azucar",
    price: 100,
    thumbnail: "azucar.png",
  },
  {
    id: 4,
    title: "azucar",
    price: 100,
    thumbnail: "azucar.png",
  },
  {
    id: 5,
    title: "azucar",
    price: 100,
    thumbnail: "azucar.png",
  },
];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(`se conecto el usuario ${socket.id}`);

  socket.join(socket.id)
  socket.on("session", (payload) => {
    console.log(payload);
    if (!users.includes(payload.mail)) {
      users.push(payload.mail);
    }
    io.to(socket.id).emit("userId", {
      sessionId: payload.mail,
      users,
    });
  });

  socket.on("message", (payload) => {
    console.log(payload);
    io.emit("message", {
      from: payload.mail,
      msg: payload.msg,
      date: moment().format('L')
    });
    miArchivo.guardar(`Mensaje de ${payload.mail} en Fecha ${payload.msg}: ${payload.msg}`)
    
  });


});

io.on("disconnect", (socket) => {
  console.log("se desconecto");
});

http.listen(puerto, () => {
  console.log(`Servidor esuchando puerto ${puerto}`);
});
