import React, { useState } from "react";

function Tablero(props) {
  const [numeroReynas, setNumeroReynas] = useState(0);
  const [coordenadasReynas, setCoordenadasReynas] = useState([]);
  const tablero = [];

  const allowDrop = ev => {
    ev.preventDefault();
  };

  const drop = (ev, x, y) => {
    ev.preventDefault();
    if (numeroReynas < 8) {
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
      switch (reyna) {
        case "reynaUno":
          props.setReynas.setReynaUno(nuevo);
          break;
        case "reynaDos":
          props.setReynas.setReynaDos(nuevo);
          break;
        case "reynaTres":
          props.setReynas.setReynaTres(nuevo);
          break;
        case "reynaCuatro":
          props.setReynas.setReynaCuatro(nuevo);
          break;
        case "reynaCinco":
          props.setReynas.setReynaCinco(nuevo);
          break;
        case "reynaSeis":
          props.setReynas.setReynaSeis(nuevo);
          break;
        case "reynaSiete":
          props.setReynas.setReynaSiete(nuevo);
          break;
        case "reynaOcho":
          props.setReynas.setReynaOcho(nuevo);
          break;
        default:
          break;
      }
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

  for (var i = 7; i >= 0; i--) {
    let fila = [];
    for (var j = 0; j < 8; j++) {
      let x = j + 1;
      let y = i + 1;
      let existeReyna = checkIfQuenIsHere(x, y);
      fila.push(
        <div
          key={`${i}${j}`} onDragOver={allowDrop} onDrop={e => {
            drop(e, x, y);
          }}
          className={
            "casilla " + (i % 2 === 0 ? j % 2 === 0 ? "negras ": "blancas ": j % 2 !== 0 ? "negras ": "blancas ")
          }>
          <div draggable={existeReyna} className={existeReyna ? "casilla-ocupado": ""}>{existeReyna ? "\u2655" : ""}</div>
        </div>
      );
    }
    tablero.push(
      <div key={`${i}`} className="fila">
        {fila}
      </div>
    );
  }
  return <React.Fragment>{tablero}</React.Fragment>;
}

export default Tablero;
