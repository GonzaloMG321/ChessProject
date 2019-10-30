class Herramientas{
    calcularAtaques(x, y){
        let array = [];
        for(let i = x; i > 0; i--){
            array.push([i, y]);
        }
        for(let i = x; i <=8 ; i++){
            array.push([i, y]);
        }
        for(let i = y; i > 0 ; i--){
            array.push([x, i]);
        }
        for(let i = y; i <=8 ; i++){
            array.push([x, i]);
        }
        /*
        for(let i = x, j = y; i <= 8 && j <= 8; i++, j++){
            console.log(i, j)
            array.push(i, j)
        }*/
        return array;
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

    removerCoordenada(x, y, coordenadas){
        let aux = coordenadas.filter((reyna) =>{
            return reyna.coordenada_x !== x || reyna.coordenada_y !== y
        });

        return aux;
    }
}

export default new Herramientas();