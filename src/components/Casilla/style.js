import styled from 'styled-components'

import imgBlanco from  '../../tablero/casilla-blanca.PNG'
import imgNegro from '../../tablero/casilla-negra.PNG'

export const Cuadro = styled.div`
    width: 80px;
    font-size: 60px;
    color: white;
    border: solid 1px black;
    display: flex;
    justify-content: center;
    background: url(${props => props.color === 'white' ? imgBlanco: imgNegro})
`

export const Knight = styled.span`
    color: white
`

export const Disponible = styled.div`
    background: #10ff0082;
    width: 80px;
`

export const Ocupado = styled.div`
    background: #ff000096;
    width: 80px;
`
