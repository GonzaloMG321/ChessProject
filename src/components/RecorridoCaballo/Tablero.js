import React from 'react';
import { Casilla } from '../Casilla/casilla';
import { useCalculoCoordenadas } from '../../hooks/coordenadas';

function Tablero(props) {
    const [coordenadas, seleccionar, verificarSiEstaDisponible, veriricarSiFueOcupado] = useCalculoCoordenadas({...props})

    const tablero = [];

    for (var i = 7; i >= 0; i--) {
        let fila = [];
        for (var j = 0; j < 8; j++) {
            let coordenada_x = j + 1;
            let coordenada_y = i + 1;
            const color = (i % 2 === 0 ? (j % 2 === 0  ? "black" : "white"): (j % 2 !== 0 ? "black": "white"))
            let knight = false;
            const disponible = verificarSiEstaDisponible(coordenada_x, coordenada_y);
            const ocupado = veriricarSiFueOcupado(coordenada_x, coordenada_y)
            if(coordenada_x === coordenadas.x && coordenada_y === coordenadas.y){
                knight = true;
            }
            const parameters = {
                color,
                coordenada_x,
                coordenada_y,
                seleccionar,
                knight,
                disponible,
                ocupado
            }
            fila.push(<Casilla key={`${i}${j}`} {...parameters}></Casilla>)
        }
        tablero.push(<div key={`${i}`} className="fila">{fila}</div>);
    }

    return (
        <React.Fragment>
            {tablero}
        </React.Fragment>
    )
}

export default Tablero;