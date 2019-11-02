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
        switch (reyna) {
            case "0":
              props.setReynas.setReynaUno(valor);
              break;
            case "1":
              props.setReynas.setReynaDos(valor);
              break;
            case "2":
              props.setReynas.setReynaTres(valor);
              break;
            case "3":
              props.setReynas.setReynaCuatro(valor);
              break;
            case "4":
              props.setReynas.setReynaCinco(valor);
              break;
            case "5":
              props.setReynas.setReynaSeis(valor);
              break;
            case "6":
              props.setReynas.setReynaSiete(valor);
              break;
            case "7":
              props.setReynas.setReynaOcho(valor);
              break;
            default:
              break;
          }
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


}

export default new Herramientas();