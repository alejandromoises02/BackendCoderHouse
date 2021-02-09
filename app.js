const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");
const puerto = 8080;
let contItems = 0;
let contItem = 0;

//Manejo de archivos

class Archivo {
  constructor(nombre) {
    this.nombre = "./" + nombre + ".txt";
  }

  async leer() {
    try {
      const productos = await fs.promises.readFile(this.nombre, "utf-8");
      return JSON.parse(productos);
    } catch (error) {
      return [];
    }
  }

  async guardar(titulo, precio, urlFoto) {
    const getID = async () => {
      const file = await this.leer();
      const id = file.length + 1;
      return id;
    };
    const nuevoProducto = {
      id: await getID(),
      title: titulo,
      price: precio,
      thumbnail: urlFoto,
    };

    let lista = await this.leer();
    lista.push(nuevoProducto);

    try {
      const aux = await fs.promises.writeFile(
        this.nombre,
        JSON.stringify(lista)
      );
    } catch (error) {
      console.log("No se pudo escribir en el archivo");
    }
    return nuevoProducto
  }

  borrar() {
    try {
      fs.unlinkSync(this.nombre);
    } catch (error) {
      console.log(error);
    }
  }
}

const miArchivo = new Archivo("productos");
//Manejo de archivos

app.get("/", (req, res) => {
  console.log("Consulta realizada a /");
  res.send("Principal");
});

app.get("/api/productos", (req, res) => {
  async function getProductos() {
    const productos = await miArchivo.leer();
    const resp = {
      items: productos,
      cantidad: productos.length,
    };
    return resp;
  }
  getProductos()
    .then((productos) => {
      res.send(productos);
    })
    .catch(function (err) {
      res.send({error: "no hay productos cargados"});
      res.sendStatus(404);
    });
});

app.get("/api/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  async function getProductos() {
    const productos = await miArchivo.leer();
    return productos;
  }
  try {
    getProductos().then((productos) => {
      productos.map((element) =>
        element.id === id ? res.send(element) : null
      );
    });
  } catch (error) {
    res.send({error: "producto no encontrado"});
    res.sendStatus(404);
  }
});

app.post("/api/productos", (req, res) => {
  try {
    const { title, price, thumbnail } = req.body;
    miArchivo.guardar(title, price, thumbnail)
    .then((resp)=>res.send(resp))
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(puerto, () => {
  console.log(`Servidor esuchando puerto ${puerto}`);
});
