import React from 'react'
import { Cuadro, Knight, Disponible, Ocupado } from './style'


export const Casilla = ({ color = "black", coordenada_x = 0, coordenada_y = 0, seleccionar, knight = false, disponible = false, ocupado = false }) =>(
    <Cuadro color={color} onClick={() => {
        seleccionar(coordenada_x, coordenada_y)
    }}>
        {knight && <Knight>&#9822;</Knight>}
        {ocupado ? <Ocupado />: (disponible && <Disponible /> ) }
    </Cuadro>
)