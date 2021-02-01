const fs = require ('fs');

class Archivo {
    constructor (nombre) {
        this.nombre = "./"+nombre+".txt"
      }
    
 
    async leerArchivo() {
        try{
            const productos = await fs.promises.readFile(this.nombre, "utf-8")
            return JSON.parse(productos);
             
        }
        catch (error){
            return [];
        }
    }

    async guardar(titulo, precio, urlFoto) {
        const getID = async () =>{
            const file = await this.leerArchivo();
            const id =file.length + 1;
            return id;
        }
        const nuevoProducto ={
            id:await getID(),
            title:titulo,
            price:precio,
            thumbnail:urlFoto
        }

       
        let lista = await this.leerArchivo();
        lista.push(nuevoProducto)
        
        try{
            const aux = await fs.promises.writeFile(this.nombre, JSON.stringify(lista))
        }
        catch(error){
            console.log("No se pudo escribir en el archivo");
        }
    }
        
    borrar(){
        try{
            fs.unlinkSync(this.nombre);
        }
        catch(error){
            console.log(error);
        }
    }

    async leer (){console.log(await this.leerArchivo()); }


}
    



