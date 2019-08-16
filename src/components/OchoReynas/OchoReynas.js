import React, { useState } from 'react';
import Tablero from './Tablero';

function OchoReynas(){
    const REYNA_UNICODE = "\u2655";
    const INITIAL_DRAGGABLE = true;
    const [reynaUno, setReynaUno] = useState({isDraggable: INITIAL_DRAGGABLE, reynaUnicode: REYNA_UNICODE});
    const [reynaDos, setReynaDos] = useState({isDraggable: INITIAL_DRAGGABLE, reynaUnicode: REYNA_UNICODE});
    const [reynaTres, setReynaTres] = useState({isDraggable: INITIAL_DRAGGABLE, reynaUnicode: REYNA_UNICODE});
    const [reynaCuatro, setReynaCuatro] = useState({isDraggable: INITIAL_DRAGGABLE, reynaUnicode: REYNA_UNICODE});
    const [reynaCinco, setReynaCinco] = useState({isDraggable: INITIAL_DRAGGABLE, reynaUnicode: REYNA_UNICODE});
    const [reynaSeis, setReynaSeis] = useState({isDraggable: INITIAL_DRAGGABLE, reynaUnicode: REYNA_UNICODE});
    const [reynaSiete, setReynaSiete] = useState({isDraggable: INITIAL_DRAGGABLE, reynaUnicode: REYNA_UNICODE});
    const [reynaOcho, setReynaOcho] = useState({isDraggable: INITIAL_DRAGGABLE, reynaUnicode: REYNA_UNICODE});
    const setReynas = {
        setReynaUno, setReynaDos, setReynaTres, setReynaCuatro, setReynaCinco, setReynaSeis, setReynaSiete, setReynaOcho
    }
    const arrastrar = (ev, reyna) => {
        ev.dataTransfer.setData("setReyna", reyna);
    }
    
    return(
        <div className="contenedor-ocho-reynas">
            <div className="tablero">
                <Tablero setReynas={setReynas} ></Tablero>
            </div>
            <div className="seccion-piezas">
                <div onDragStart={(e) => {
                    arrastrar(e, "reynaUno");
                }} draggable={reynaUno.isDraggable} className={"pieza-reyna " + (reynaUno.isDraggable ? "cursor-pointer": "")} >{reynaUno.reynaUnicode}</div>
                <div onDragStart={(e) => {
                    arrastrar(e, "reynaDos");
                }} draggable={reynaDos.isDraggable} className={"pieza-reyna " + (reynaDos.isDraggable ? "cursor-pointer": "")}>{reynaDos.reynaUnicode}</div>
                <div onDragStart={(e) => {
                    arrastrar(e, "reynaTres");
                }} draggable={reynaTres.isDraggable} className={"pieza-reyna " + (reynaTres.isDraggable ? "cursor-pointer": "")}>{reynaTres.reynaUnicode}</div>
                <div onDragStart={(e) => {
                    arrastrar(e, "reynaCuatro");
                }} draggable={reynaCuatro.isDraggable} className={"pieza-reyna " + (reynaCuatro.isDraggable ? "cursor-pointer": "")}>{reynaCuatro.reynaUnicode}</div>
                <div onDragStart={(e) => {
                    arrastrar(e, "reynaCinco");
                }} draggable={reynaCinco.isDraggable} className={"pieza-reyna " + (reynaCinco.isDraggable ? "cursor-pointer": "")}>{reynaCinco.reynaUnicode}</div>
                <div onDragStart={(e) => {
                    arrastrar(e, "reynaSeis");
                }} draggable={reynaSeis.isDraggable} className={"pieza-reyna " + (reynaSeis.isDraggable ? "cursor-pointer": "")}>{reynaSeis.reynaUnicode}</div>
                <div onDragStart={(e) => {
                    arrastrar(e, "reynaSiete");
                }} draggable={reynaSiete.isDraggable} className={"pieza-reyna " + (reynaSiete.isDraggable ? "cursor-pointer": "")}>{reynaSiete.reynaUnicode}</div>
                <div onDragStart={(e) => {
                    arrastrar(e, "reynaOcho");
                }} draggable={reynaOcho.isDraggable} className={"pieza-reyna " + (reynaOcho.isDraggable ? "cursor-pointer": "")}>{reynaOcho.reynaUnicode}</div>
            </div>
        </div>
    )
}

export default OchoReynas;