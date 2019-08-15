import React, { useState } from 'react';

function Tablero(props){
    const [ coordenadas, setCoordenadas ] = useState(props.coordenadas);
    const tablero = [];

    for (var i = 7; i >= 0; i--) {
        let fila = [];
        for (var j = 0; j < 8; j++) {
            fila.push(<div key={`${i}${j}`}  className={"casilla " + (i % 2 === 0 ? (j % 2 === 0  ? "negras " : "blancas "): (j % 2 !== 0 ? "negras ": "blancas "))}><div>{(j + 1) === coordenadas[0] && (i + 1) === coordenadas[1] ? "\u265E": ""}</div></div>)
        }
        tablero.push(<div key={`${i}`} className="fila">{fila}</div>);
    }
    return(
        <React.Fragment>
            {tablero}
        </React.Fragment>
    )
}

export default Tablero;