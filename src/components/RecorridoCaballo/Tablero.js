import React, { useState, useEffect } from 'react';

function Tablero(props) {
    const [ coordenadas, setCoordenadas ] = useState(props.coordenadas);
    const [coordenadasDisponibles, setCoordenadasDisponibles] = useState([]);
    const [casillaOcupada, setCasillaOcupada] = useState([]);
    const [mostrarCasillasDisponibles, setMostrarCasillasDisponibles] = useState(true);

    const tablero = [];

    const seleccionar = (x, y) => {
        if(coordenadas[0] === 0 && coordenadas[1] === 0){
            props.cambiarMensaje("Playing...");
            setCoordenadas([x, y]);
            setCoordenadasDisponibles(calcularCasillas(x, y));
            setMostrarCasillasDisponibles(!mostrarCasillasDisponibles);
            return;
        }

        if(x === coordenadas[0] && y === coordenadas[1]){
            if(!veriricarSiFueOcupado(x, y)){
                if(mostrarCasillasDisponibles){
                    setCoordenadasDisponibles(calcularCasillas(x, y));
                }else{
                    setCoordenadasDisponibles([]);
                }

                setMostrarCasillasDisponibles(!mostrarCasillasDisponibles);
            }
        }else{
            let estaseleccionado = verificarSiEstaSeleccionado(x, y);
            if(estaseleccionado && !veriricarSiFueOcupado(x, y)){
                let nuevo = casillaOcupada;
                nuevo.push(coordenadas);
                setCasillaOcupada(nuevo);

                setCoordenadas([x, y]);
                setCoordenadasDisponibles([]);
                setCoordenadasDisponibles(calcularCasillas(x, y))
                verificarSiPerdioGano(x, y);
            }
        }
    }

    const verificarSiEstaSeleccionado = (x, y) => {
        let disponible = false;
        coordenadasDisponibles.forEach(value => {
            if(value[0] === x && value[1] === y){
                disponible = true;
            }
        });
        return disponible;
    }

    const verificarSiEstaDisponible = (x, y) => {
        let disponible = false
        coordenadasDisponibles.forEach( value => {
            if(value[0] === x && value[1] === y){
                disponible = true;
            }
        })

        return disponible;
    }

    const veriricarSiFueOcupado = (x, y) => {
        let ocupado = false;
        casillaOcupada.forEach(value => {
            if(value[0] === x && value[1] === y){
                ocupado = true
            }
        });
        return ocupado;
    }

    const calcularCasillas = (x, y) => {
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

    const verificarSiPerdioGano = (x, y) =>{
        let casillasSiguientesCalculadas = calcularCasillas(x, y);
        let contCasillasValidas = 0;
        let contadorCasillasInvalidas = 0;
        casillasSiguientesCalculadas.forEach(value => {
            if(value[0] > 0 && value[0] <= 8 && value[1] > 0 && value[1] <= 8){
                contCasillasValidas++;
                casillaOcupada.forEach(ocupado => {
                    if(value[0] === ocupado[0] && value[1] === ocupado[1]){
                        contadorCasillasInvalidas++;
                    }
                });
            }
        });
        
        if(casillaOcupada.length === 63){
            props.cambiarMensaje("Juego Ganado");
            props.setJuegoPerdido(true);   
        }else{
            if(contCasillasValidas <= contadorCasillasInvalidas){
                props.cambiarMensaje("Juego perdido");
                props.setJuegoPerdido(true);   
            }
        }
    }

    for (var i = 7; i >= 0; i--) {
        let fila = [];
        for (var j = 0; j < 8; j++) {
            let x = j + 1;
            let y = i + 1;
            let seleccionado = verificarSiEstaDisponible(x, y) ? "seleccionado": "";
            let ocupado = veriricarSiFueOcupado(x, y);
            fila.push(<div key={`${i}${j}`} onClick={ () => {
                seleccionar(x, y);
            }} className={(i % 2 === 0 ? (j % 2 === 0  ? "casilla negras " : "casilla blancas "): (j % 2 !== 0 ? "casilla negras ": "casilla blancas "))}><div className={seleccionado  +(ocupado ? " nodisponible ": "") }>{(j + 1) === coordenadas[0] && (i + 1) === coordenadas[1] ? "\u265E": ""}</div></div>)
        }
        tablero.push(<div key={`${i}`} className="fila">{fila}</div>);
    }

    const { reinicio } = props;
    const funcionReiniciar = props.setReiniciarJuego;
    useEffect(() => {
        if(reinicio){
            setCoordenadas([0, 0]);
            setCoordenadasDisponibles([]);
            setCasillaOcupada([])
            funcionReiniciar(false);
        }
    }, [reinicio, funcionReiniciar])

    return (
        <React.Fragment>
            {tablero}
        </React.Fragment>
    )
}

export default Tablero;