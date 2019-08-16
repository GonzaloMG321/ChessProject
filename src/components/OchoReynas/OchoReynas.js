import React, { useState } from 'react';
import Tablero from './Tablero';

function OchoReynas(){

    const arrastrar = (ev) => {
        //ev.preventDefault();
        console.log("Arrastrando");
    }

    const soltar = (ev) => {
        //ev.preventDefault();
        console.log("Soltando");
    }

    return(
        <div className="contenedor-ocho-reynas">
            <div className="tablero">
                <Tablero></Tablero>
            </div>
            <div className="seccion-piezas">
                <div onDragStart={arrastrar} draggable="true" className="pieza-reyna">&#9813;</div>
                <div onDragStart={arrastrar} draggable="true" className="pieza-reyna">&#9813;</div>
                <div onDragStart={arrastrar} draggable="true" className="pieza-reyna">&#9813;</div>
                <div onDragStart={arrastrar} draggable="true" className="pieza-reyna">&#9813;</div>
                <div onDragStart={arrastrar} draggable="true" className="pieza-reyna">&#9813;</div>
                <div onDragStart={arrastrar} draggable="true" className="pieza-reyna">&#9813;</div>
                <div onDragStart={arrastrar} draggable="true" className="pieza-reyna">&#9813;</div>
                <div onDragStart={arrastrar} draggable="true" className="pieza-reyna">&#9813;</div>
            </div>
        </div>
    )
}

export default OchoReynas;