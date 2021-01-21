const MostrarPalabras = (mensaje, tiempo = 1000, callback) => {
    const PalabrasDivididas = mensaje.split(' ');
    let i = 0;
    let idInterval = setInterval( (PalabrasDivididas) => {

        if (i < PalabrasDivididas.length) {
            console.log(PalabrasDivididas[i])
            i++;
        } else {
            clearInterval(idInterval)
            callback(PalabrasDivididas.length)
        }

    }, tiempo, PalabrasDivididas)
}

MostrarPalabras("Primer mensaje para la funcion MP", 200, (cont) => {
    let totales = cont;
    MostrarPalabras("Segundo mensaje para la funcion MP", 200, (cont) => {
        totales = totales + cont;
        MostrarPalabras("Tercer mensaje para la funcion MP", 200, (cont) => {
            totales = totales + cont;
            console.log("PROCESO COMPLETO CANTIDAD DE PALABRAS: " + totales)
        });
    });
});