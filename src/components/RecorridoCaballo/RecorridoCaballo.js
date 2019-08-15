import React, { useState } from 'react';
import Tablero from './Tablero';

function RecorridoCaballo() {    
    const MENSAJE_DEFAULT = "Seleccione el lugar donde desea comenzar";
    const [coordenadas, setCoordenadas] = useState([0, 0]);
    const [mensaje, setMensaje] = useState(MENSAJE_DEFAULT);
    const [juegoPerdido, setJuegoPerdido] = useState(false);
    const [reiniciarJuego, setReiniciarJuego] = useState(false);

    return (
        <div>
            <div className="tablero">
                <Tablero coordenadas={coordenadas} cambiarMensaje={setMensaje} reinicio={reiniciarJuego} setReiniciarJuego={setReiniciarJuego} setJuegoPerdido={setJuegoPerdido}></Tablero>
            </div>
            <div>
                <h1>{mensaje}</h1>
                {juegoPerdido ? <button onClick={() => {
                    setCoordenadas([0, 0]);
                    setJuegoPerdido(false);
                    setReiniciarJuego(true);
                    setMensaje(MENSAJE_DEFAULT);
                }}>Jugar otra vez</button> : null}
            </div>
        </div>
    );
}

export default RecorridoCaballo;

