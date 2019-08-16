import React, { useState } from 'react';

function Tablero(props){
    const [ numeroReynas, setNumeroReynas ] = useState(0);
    const tablero = [];

    const allowDrop = (evt) => {
        console.log("Encimando....")
    }

    const drop = (evt) => {
        console.log("Soltando...");
    }

    for (var i = 7; i >= 0; i--) {
        let fila = [];
        for (var j = 0; j < 8; j++) {
            fila.push(<div key={`${i}${j}`} onDragOver={allowDrop} onDrop={drop}  className={"casilla " + (i % 2 === 0 ? (j % 2 === 0  ? "negras " : "blancas "): (j % 2 !== 0 ? "negras ": "blancas "))}><div></div></div>)
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