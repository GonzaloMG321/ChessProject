import React, { useState } from 'react';
import Tablero from './Tablero';
import Herramientas from './Herramientas';
import classnames from 'classnames'

function OchoReynas(){
    const [arrayReynas, setArrayReynas] = useState(Herramientas.getReynasInicio());
    const [dragTerminado, setDragTerminado] = useState(false);
    const [reinicio, setReinicio] = useState(false);
    const [historialMovimientos, setHistorialMovimientos] = useState([]);
    const [regresarMovimiento, setRegresarMovimiento] = useState(false);
    
    const arrastrar = (ev, reyna) => {
        ev.dataTransfer.setData("setReyna", reyna);
    }
    
    const dragEnd = ev => {
       setDragTerminado(true);
    }

    const reynas = arrayReynas.map(reyna => (
        <div key={reyna.numero} onDragStart={(e)=>{
            arrastrar(e, reyna.numero)
        }} onDragEnd={dragEnd} draggable={reyna.is_draggable} className={classnames("pieza-reyna", {
            "cursor-pointer": reyna.is_draggable
        })}>{reyna.is_draggable && reyna.reyna_unicode}
        </div>));

    const regresar = () =>{
        //let aux = historialMovimientos;
        //aux.pop()
        //setHistorialMovimientos(aux);
        setRegresarMovimiento(true);
    }

    return(
        <div className="contenedor-ocho-reynas">
            <div className="tablero">
                <Tablero setArrayReynas={setArrayReynas} arrayReynasRestantes={arrayReynas} dragTerminado={dragTerminado} setDragTerminado={setDragTerminado} reinicio={reinicio} setReinicio={setReinicio} historialMovimientos={historialMovimientos} setHistorialMovimientos={setHistorialMovimientos} regresarMovimiento={regresarMovimiento} setRegresarMovimiento={setRegresarMovimiento}></Tablero>
            </div>
            <div className="seccion-piezas">
                {reynas}
            </div>
            <div>
                <button onClick={()=>{
                    setReinicio(true);
                    setArrayReynas(Herramientas.getReynasInicio);
                }}>Reiniciar</button>
                <button onClick={regresar}>Regresar</button>
            </div>
        </div>
    )
}

export default OchoReynas;