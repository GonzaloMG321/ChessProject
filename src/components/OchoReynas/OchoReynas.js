import React, { useState } from 'react';
import Tablero from './Tablero';

function OchoReynas(){
    const [coordenadas, setCoordenadas] = useState([0, 0]);
    return(
        <div>
            <div className="tablero">
                <Tablero coordenadas={coordenadas} ></Tablero>
            </div>
        </div>
    )
}

export default OchoReynas;