const fs = require ('fs');

let arrProductos;

    const EscribirArchivo = () => {
        
            fs.promises.writeFile("./Archivo.txt", "utf-8")
            
        
       
    }

    const leerArchivo = async () => {
        try{
            const productos = await fs.promises.readFile("./Archivo.txt", "utf-8")
            //console.log(productos);
            arrProductos = JSON.parse(productos);    
            console.log(arrProductos);
            //mostrar array de productos
            //retornar array
        }
        catch (error){
            console.log("No existe");
            //mostrar array vacio
        }
    }

    async function guardarArchivo(nombre, precio, urlFoto) {
        try{
            //leer longitud de productos
            //crear producto con id
            await fs.promises.appendFile("./Archivo.txt", "ACA VA EL NUEVO PRODUCTO")
        }
        catch(error){
            console.log("No se pudo escribir en el archivo");
        }
    }
        
    function borrarArchivo(){
        try{
            fs.unlink("./Archivo.txt");
        }
        catch(error){
            console.log("No se pudo borrar");
        }
    }

    leerArchivo()

