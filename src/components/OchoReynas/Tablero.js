import React, { useState, useEffect } from "react";
import Herramientas from "./Herramientas";
import classnames from 'classnames'

function Tablero(props) {
  const [numeroReynas, setNumeroReynas] = useState(0);
  const [coordenadasReynas, setCoordenadasReynas] = useState([]);
  const [coordenadasAtaque, setCoordenadasAtaque] = useState([]);
  const [coordenadaPrevia, setCoordenadaPrevia] = useState([0, 0]);
  const [queen, setQueen] = useState(null);
  const { dragTerminado } = props;
  const functionSetDragTeminado = props.setDragTerminado;
  const tablero = [];

  useEffect(() => {
    let img = new Image();
    img.src = require("../../tablero/queen.png");
    img.onload = () => setQueen(img);
  }, [])
  const allowDrop = (ev, x, y) => {
    ev.preventDefault();
    setCoordenadasAtaque(Herramientas.calcularAtaques(x, y, coordenadasReynas));
  };

  const drop = (ev, x, y) => {
    ev.preventDefault(); 
    if(ev.dataTransfer.getData("arrastreEstablecido")){
      const numeroReyna = ev.dataTransfer.getData("numeroReyna");
      let coordenadasReynasActualizadas = Herramientas.actualizarUbicacionReyna(x, y, parseInt(numeroReyna), coordenadasReynas);
      setCoordenadasReynas(coordenadasReynasActualizadas);
      setCoordenadasAtaque([]);
      setCoordenadaPrevia([0, 0]);
    }else if (numeroReynas < 8) {
      setNumeroReynas(numeroReynas + 1);
      let posicionReyna = {
        numero: numeroReynas,
        coordenada_x: x,
        coordenada_y: y
      };
      let anteriores = coordenadasReynas;
      anteriores.push(posicionReyna);
      setCoordenadasReynas(anteriores);
      let nuevo = { isDraggable: false, reynaUnicode: "" };
      const reyna = ev.dataTransfer.getData("setReyna");
      Herramientas.removerReyna(reyna, props,nuevo);
    }else{
       console.log(coordenadasReynas);
    }
  };

  const checkIfQuenIsHere = (x, y) => {
    let isHere = false;
    coordenadasReynas.forEach(reyna => {
      if (reyna.coordenada_x === x && reyna.coordenada_y === y) {
        isHere = true;
      }
    });
    return isHere;
  };

  const obtenerNumeroReyna = (x, y ) =>{
    let numero = 0;
    coordenadasReynas.forEach(reyna => {
      if(reyna.coordenada_x === x && reyna.coordenada_y === y){
        numero = reyna.numero;
      }
    })
    return numero;
  }

  const setearValores = () => {
    setCoordenadaPrevia([0, 0]); 
    setCoordenadasAtaque([]);
  }

  for (var i = 7; i >= 0; i--) {
    let fila = [];
    for (var j = 0; j < 8; j++) {
      let x = j + 1;
      let y = i + 1;
      let existeReyna = checkIfQuenIsHere(x, y);
      let numeroReyna = obtenerNumeroReyna(x, y);
      let disponibleAtaque = Herramientas.verificarSiDisponibleAtaque(x, y, coordenadasAtaque);
      fila.push(
        <div
          key={`${i}${j}`} onDragOver={(e) => { 
            if(!existeReyna || (coordenadaPrevia[0] === x && coordenadaPrevia[1])){
              allowDrop(e, x, y);
            }else{
              setCoordenadasAtaque([]);
            }
          }} onDrop={e => {
            drop(e, x, y);
          }}
          className={classnames("casilla " + (i % 2 === 0 ? j % 2 === 0 ? "negras": "blancas": j % 2 !== 0 ? "negras": "blancas"), {
          })
          }>
          {
            (coordenadaPrevia[0] === x && coordenadaPrevia[1] === y && disponibleAtaque) || (disponibleAtaque && !existeReyna)?
              <div onDragEnd={() => {
                setearValores();
              }}className="casilla-contenedor">
                <div className="casilla-atacado-disponible casilla-disponible"></div>
              </div>
            : existeReyna && (coordenadaPrevia[0] !== x || coordenadaPrevia[1] !== y) ? 
            <div draggable={true} onDragStart={(e)=>{
                e.dataTransfer.setData("arrastreEstablecido", true);
                e.dataTransfer.setData("numeroReyna", numeroReyna);
                e.dataTransfer.setDragImage(queen, 0, 0);
                setCoordenadaPrevia([x, y]);
            }} onDragEnd={()=>{
              setearValores();
            }} className={classnames("", {
              "casilla-ocupado": true,
              "casilla-atacado": existeReyna && disponibleAtaque
            })}>{existeReyna ? "\u2655" : ""}</div>:
              existeReyna ? <div draggable={true} onDragEnd={() =>{
                setearValores();
              }} className="casilla-contenedor"></div> :null
          }
        </div>
      );
    }
    tablero.push(
      <div key={`${i}`} className="fila">
        {fila}
      </div>
    );
  }

  useEffect(() => {
    if(dragTerminado){
      setCoordenadasAtaque([]);
      functionSetDragTeminado(false);
    }
  }, [dragTerminado, functionSetDragTeminado])
  return <React.Fragment>{tablero}</React.Fragment>;
}

export default Tablero;
