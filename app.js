var http = require("http");
var server = http.createServer((req , res)=>{
    let id = Math.random() * (10 - 1) + 1;
    let title = "Producto " + Math.random() * (10 - 1) + 1;
    let price = Math.random() * (9999.99 - 0.00) + 0.00;
    let thumbnail = "Foto " + Math.random() * (10 - 1) + 1;
    let objeto = {
        id : id,
        title: title,
        price: price,
        thumbnail: thumbnail
    }
    res.end(JSON.stringify(objeto))
})

const PORT = process.env.PORT || 30000

server.listen(PORT, ()=>{
    console.log("Servidor Http escuchando en el puerto ${PORT}");
})