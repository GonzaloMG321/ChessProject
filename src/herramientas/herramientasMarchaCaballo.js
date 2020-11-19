export const calcularCasillas = (x, y) => {
    let casillas = [];
    const primeraCoordenada = [x + 2, y - 1];
    const segundaCoordenada = [x + 2, y + 1];

    const terceraCoordenada = [x + 1, y - 2];
    const cuartaCoordenada = [x - 1, y - 2];

    const quintaCoordenada = [x - 2, y - 1];
    const sextaCoordenada = [x - 2, y + 1];

    const septimaCoordenada = [x - 1, y + 2];
    const octavaCoordenada = [x + 1, y + 2];
    casillas.push(primeraCoordenada);
    casillas.push(segundaCoordenada);
    casillas.push(terceraCoordenada);
    casillas.push(cuartaCoordenada);
    casillas.push(quintaCoordenada);
    casillas.push(sextaCoordenada);
    casillas.push(septimaCoordenada);
    casillas.push(octavaCoordenada);
    return casillas;
}


