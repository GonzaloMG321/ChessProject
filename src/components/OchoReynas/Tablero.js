import React, { useState, useEffect } from "react";
import Herramientas from "./Herramientas";
import classnames from 'classnames'

function Tablero(props) {
  const [numeroReynas, setNumeroReynas] = useState(0);
  const [coordenadasReynas, setCoordenadasReynas] = useState([]);
  const [coordenadasAtaque, setCoordenadasAtaque] = useState([]);
  const [coordenadaPrevia, setCoordenadaPrevia] = useState([0, 0]);
  const [existeAtaque, setExisteAtaque] = useState(false);
  const [queen, setQueen] = useState(null);
  const { dragTerminado } = props;
  const functionSetDragTeminado = props.setDragTerminado;
  const setReinicio = props.setReinicio;
  const setRegresarMovimiento = props.setRegresarMovimiento;
  const setArrayReynas = props.setArrayReynas;
  const tablero = [];

  useEffect(() => {
    let img = new Image();
    img.src = require("../../tablero/queen.png");
    img.onload = () => setQueen(img);
  }, [])
  const allowDrop = (ev, x, y) => {
    ev.preventDefault();
    calcularPosicionAtaque(x, y);
  };

  const calcularPosicionAtaque = (x, y) =>{
    let resultadoCalculo = Herramientas.calcularAtaques(x, y, coordenadasReynas, coordenadaPrevia);
    let arrayResultado = resultadoCalculo.coordenadas;
    let existeAtaque = resultadoCalculo.existe_ataque;
    setExisteAtaque(existeAtaque);
    setCoordenadasAtaque(arrayResultado);
  }

  const noAllowDrop = (e, x, y) => {
    //e.preventDefault();
    calcularPosicionAtaque(x, y)
  }

  const drop = (ev, x, y) => {
    ev.preventDefault(); 
    const reyna = ev.dataTransfer.getData("setReyna");
    if(ev.dataTransfer.getData("arrastreEstablecido")){
      let coordenadasReynasActualizadas = Herramientas.actualizarUbicacionReyna(x, y, parseInt(reyna), coordenadasReynas);
      setCoordenadasReynas(coordenadasReynasActualizadas);
      

      let movimiento = {
        origen: "tablero",
        reyna:  parseInt(reyna),
        coord_origen:{
          coordenada_x: coordenadaPrevia[0],
          coordenada_y: coordenadaPrevia[1]
        },
        destino: {
          coordenada_x: x,
          coordenada_y: y
        }
      }
      let historial = props.historialMovimientos;
      historial.push(movimiento);
      props.setHistorialMovimientos(historial);
      setearValores();
    }else if (numeroReynas < 8) {
      setNumeroReynas(numeroReynas + 1);
      let posicionReyna = {
        numero: parseInt(reyna),
        coordenada_x: x,
        coordenada_y: y
      };
      let anteriores = coordenadasReynas;
      anteriores.push(posicionReyna);
      setCoordenadasReynas(anteriores);
      let nuevo = { isDraggable: false, reynaUnicode: "" };
      
      Herramientas.removerReyna(reyna, props,nuevo);
      let movimiento = {
        origen: "inicio",
        reyna:  parseInt(reyna),
        destino: {
          coordenada_x: x,
          coordenada_y: y
        }
      }

      let historial = props.historialMovimientos;
      historial.push(movimiento);
      props.setHistorialMovimientos(historial);
    }else{
      
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

  const arrastrandoReynaEstablecida = (e, x, y, numeroReyna) =>{
    e.dataTransfer.setData("arrastreEstablecido", true);
    e.dataTransfer.setData("setReyna", numeroReyna);
    e.dataTransfer.setDragImage(queen, 0, 0);
    setCoordenadaPrevia([x, y]);
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
              if(existeAtaque){
                noAllowDrop(e, x, y);
              }else{
                allowDrop(e, x, y);
              }
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
              arrastrandoReynaEstablecida(e, x, y, numeroReyna);
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

  useEffect(() =>{
    if(props.reinicio){
      setCoordenadasReynas([]);
      setNumeroReynas(0);
      setCoordenadasAtaque([]);
      setearValores();
      setReinicio(false);
    }
  }, [props.reinicio, setReinicio])

  useEffect(() =>{
    if(props.regresarMovimiento){
      if(props.historialMovimientos.length > 0){
        let ultimo = props.historialMovimientos.pop();
        if(ultimo.origen === "tablero"){
          let aux = coordenadasReynas.map(value =>{
            if(ultimo.reyna === value.numero){
              value.coordenada_x = ultimo.coord_origen.coordenada_x;
              value.coordenada_y = ultimo.coord_origen.coordenada_y;
            }

            return value;
          })
          setCoordenadasReynas(aux);
        }else{
          let restantes = props.arrayReynasRestantes.map((valor) =>{
            if(valor.numero === ultimo.reyna){
              valor.is_draggable = true
            }
            return valor;
          });
          setNumeroReynas(numeroReynas - 1);
          setArrayReynas(restantes);
          let aux = coordenadasReynas.filter((reyna) =>{
            return reyna.numero !== ultimo.reyna
          })
          setCoordenadasReynas(aux);
        }
      }
      
      //setRegresarMovimiento()
      setRegresarMovimiento(false);
    }
  }, [props.regresarMovimiento, setRegresarMovimiento, props.historialMovimientos, props.arrayReynasRestantes, setArrayReynas, coordenadasReynas, numeroReynas]);
  return <React.Fragment>{tablero}</React.Fragment>;
}

export default Tablero;
