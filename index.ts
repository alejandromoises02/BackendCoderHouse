const calculateModule = "./calculadores"

const operacion = async (a: number,  b: number, ope:String): Promise<any> =>{

    let operation = null;

    switch(ope.toUpperCase()){
        case "SUMA":
            operation = await import(calculateModule).then(m => m.Suma)
            break

        case 'RESTA':
            operation = await import(calculateModule).then(m => m.Resta)
            break

        default: console.log("Operacion invalida");

    }
    return new operation(a , b).result();

}

const operaciones = async () =>{
    let rest = await operacion(2 , 4 , "suma")
    console.log(rest);
    rest = await operacion(5 , 3 , "ReSTa")
    console.log(rest);
    rest = await operacion(2 , 2 , "error")
    console.log(rest);
    
}

operaciones();