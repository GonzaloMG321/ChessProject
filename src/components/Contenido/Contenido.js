import React from 'react';
import LateralComponent from './LateralComponent';
import ContenidoPrincipal from './ContenidoPrincipal/ContenidoPrincipal';
import './contenido.css';

function Contenido(){
    return (
        <div className="elemento elemento2">
            <LateralComponent></LateralComponent>
            <ContenidoPrincipal></ContenidoPrincipal>
        </div>
    )
}

export default Contenido;