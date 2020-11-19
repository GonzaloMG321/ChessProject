import { useState, useEffect } from 'react'
import { calcularCasillas } from '../herramientas/herramientasMarchaCaballo';

export const useCalculoCoordenadas = ({cambiarMensaje, setJuegoPerdido, reinicio, setReiniciarJuego}) =>{
    const [coordenadas, setCoordenadas] = useState({x: 0, y: 0});
    const [coordenadasDisponibles, setCoordenadasDisponibles] = useState([]);
    const [casillaOcupada, setCasillaOcupada] = useState([]);
    const [mostrarCasillasDisponibles, setMostrarCasillasDisponibles] = useState(true);

    const seleccionar = (x, y) => {
        if(coordenadas.x === 0 && coordenadas.y === 0){
            cambiarMensaje("Playing...")
            setCoordenadas({x, y});
            setCoordenadasDisponibles(calcularCasillas(x, y));
            setMostrarCasillasDisponibles(!mostrarCasillasDisponibles);
            return;
        }
    
        if(x === coordenadas.x && y === coordenadas.y){
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
    
                setCoordenadas({x, y});
                setCoordenadasDisponibles([]);
                setCoordenadasDisponibles(calcularCasillas(x, y))
                verificarSiPerdioGano(x, y);
            }
        }
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
            if(value.x === x && value.y === y){
                ocupado = true
            }
        });
        return ocupado;
    }


    const verificarSiPerdioGano = (x, y) =>{
        let casillasSiguientesCalculadas = calcularCasillas(x, y);
        let contCasillasValidas = 0;
        let contadorCasillasInvalidas = 0;
        casillasSiguientesCalculadas.forEach(value => {
            if(value[0] > 0 && value[0] <= 8 && value[1] > 0 && value[1] <= 8){
                contCasillasValidas++;
                casillaOcupada.forEach(ocupado => {
                    if(value[0] === ocupado.x && value[1] === ocupado.y){
                        contadorCasillasInvalidas++;
                    }
                });
            }
        });
        
        if(casillaOcupada.length === 63){
            cambiarMensaje("Juego Ganado");
            setJuegoPerdido(true);   
        }else{
            if(contCasillasValidas <= contadorCasillasInvalidas){
                cambiarMensaje("Juego perdido");
                setJuegoPerdido(true);   
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

    useEffect(() => {
        if(reinicio){
            setCoordenadas({x:0, y:0});
            setCoordenadasDisponibles([]);
            setCasillaOcupada([])
            setReiniciarJuego(false);
        }
    }, [reinicio, setReiniciarJuego])

    return [coordenadas, seleccionar, verificarSiEstaDisponible, veriricarSiFueOcupado]
}
