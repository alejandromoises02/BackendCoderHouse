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

app.get("/items", (req, res) => {
  contItems++;

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
      console.log(err);
    });
});

app.get("/item-random", (req, res) => {
  contItem++;

  let resp;

  async function getProductoRandom() {
    productos = await miArchivo.leer();
    cantidad = productos.length - 1;
    return productos[Math.floor(Math.random() * (cantidad - 0)) + 0];
  }

  getProductoRandom()
    .then((prod) => {
      resp = {
        item: prod,
      };
      res.send(resp);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/visitas", (req, res) => {
  try {
    const visitas = {
      items: contItems,
      item: contItem,
    };
    res.send(visitas);
  } catch (err) {
    console.log(err);
  }
});

app.listen(puerto, () => {
  console.log(`Servidor esuchando puerto ${puerto}`);
});
