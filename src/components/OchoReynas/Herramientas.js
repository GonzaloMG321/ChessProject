class Herramientas{
    calcularAtaques(x, y, arrayReynasTablero, coordenadaReynaArraste){
        let array = [];
        array.push([x, y]);
        let i = x - 1;
        let coincide = false;
        let existeAtaque = false;
        while(i > 0 && !coincide){
          for(let j = 0; j < arrayReynasTablero.length; j++){
            let aux = arrayReynasTablero[j];
            if(aux.coordenada_x === i && aux.coordenada_y === y && (coordenadaReynaArraste[0] !== i || coordenadaReynaArraste[1] !== y)){
              coincide = true;
              existeAtaque = true;
              break;
            }
          }
          array.push([i, y])
          i--;
        };
        coincide = false;
        i = x + 1;
        while(i <= 8 && !coincide){
          for(let j = 0; j < arrayReynasTablero.length; j++){
            let aux = arrayReynasTablero[j];
            if(aux.coordenada_x === i && aux.coordenada_y === y && (coordenadaReynaArraste[0] !== i || coordenadaReynaArraste[1] !== y)){
              coincide = true;
              existeAtaque = true;
              break;
            }
          }
          array.push([i, y])
          i++;
        };

        coincide = false;
        i = y - 1; 
        while(i > 0 && !coincide){
          for(let j = 0; j < arrayReynasTablero.length; j++){
            let aux = arrayReynasTablero[j];
            if(aux.coordenada_x === x && aux.coordenada_y === i && (coordenadaReynaArraste[0] !== x || coordenadaReynaArraste[1] !== i)){
              coincide = true;
              existeAtaque = true;
              break;
            }
          }
          array.push([x, i])
          i--;
        };

        coincide = false;
        i = y + 1;
        while(i <= 8 && !coincide){
          for(let j = 0; j < arrayReynasTablero.length; j++){
            let aux = arrayReynasTablero[j];
            if(aux.coordenada_x === x && aux.coordenada_y === i && (coordenadaReynaArraste[0] !== x || coordenadaReynaArraste[1] !== i)){
              coincide = true;
              existeAtaque = true;
              break
            }
          }
          array.push([x, i])
          i++;
        };
        
        i = x - 1;
        let yy = y + 1;
        coincide = false;
        while(i > 0 && yy <= 8 && !coincide){
          for(let j = 0; j < arrayReynasTablero.length; j++){
            let aux = arrayReynasTablero[j];
            if(aux.coordenada_x === i && aux.coordenada_y === yy && (coordenadaReynaArraste[0] !== i || coordenadaReynaArraste[1] !== yy)){
              coincide = true;
              existeAtaque = true;
              break
            }
          }
          array.push([i, yy]);
          i--;
          yy++;
        }

        i = x + 1;
        yy = y + 1;
        coincide = false;
        while(i <= 8 && yy <=8 && !coincide){
          for(let j = 0; j < arrayReynasTablero.length; j++){
            let aux = arrayReynasTablero[j];
            if(aux.coordenada_x === i && aux.coordenada_y === yy && (coordenadaReynaArraste[0] !== i || coordenadaReynaArraste[1] !== yy)){
              coincide = true;
              existeAtaque = true;
              break
            }
          }
          array.push([i, yy]);
          i++;
          yy++;
        }

        i = x + 1;
        yy = y - 1;
        coincide = false;
        while(i <=8 && yy > 0 && !coincide){
          for(let j = 0; j < arrayReynasTablero.length; j++){
            let aux = arrayReynasTablero[j];
            if(aux.coordenada_x === i && aux.coordenada_y === yy && (coordenadaReynaArraste[0] !== i || coordenadaReynaArraste[1] !== yy)){
              coincide = true;
              existeAtaque = true;
              break
            }
          }
          array.push([i, yy]);
          i++;
          yy--;
        }

        i = x - 1;
        yy = y - 1;
        coincide = false;
        while(i > 0 && yy > 0 && !coincide){
          for(let j = 0; j < arrayReynasTablero.length; j++){
            let aux = arrayReynasTablero[j];
            if(aux.coordenada_x === i && aux.coordenada_y === yy && (coordenadaReynaArraste[0] !== i || coordenadaReynaArraste[1] !== yy)){
              coincide = true;
              existeAtaque = true;
              break
            }
          }
          array.push([i, yy]);
          i--;
          yy--;
        }

        
        return {
          coordenadas: array,
          existe_ataque: existeAtaque
        };
    }

    verificarSiDisponibleAtaque(x, y, coordenadas){
        for(let i = 0; i < coordenadas.length; i++){
            if(coordenadas[i][0] === x && coordenadas[i][1] === y){
                return true;
            }
        }

        return false;
    }

    removerReyna(reyna, props, valor){
        let nuevo = props.arrayReynasRestantes.map((value) => {
          if(value.numero === parseInt(reyna)){
            value.is_draggable = false;
          }
          return value;
        });

        props.setArrayReynas(nuevo);
    }

    actualizarUbicacionReyna(x, y, numeroReyna, coordenadasActuales = []){
         let nuevo = coordenadasActuales.map(reyna=>{
             if(numeroReyna === reyna.numero){
                 reyna["coordenada_x"] = x;
                 reyna["coordenada_y"] = y;
             }
             return reyna;
         });
         return nuevo;
    }

    getReynasInicio(){
      let array = [];
      const INITIAL_DRAGGABLE = true;
      const REYNA_UNICODE = "\u2655";
    
      for(let i = 0; i < 8; i++){
        let reyna = {
          is_draggable: INITIAL_DRAGGABLE,
          reyna_unicode: REYNA_UNICODE,
          numero: i 
        }
        array.push(reyna);
      }

      return array;
    }


}

export default new Herramientas();