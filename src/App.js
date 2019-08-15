import React, { useState } from 'react';
import './App.css';
//import HorizontalComponent from './components/horizontal/HorizontalComponent';
//import Contenido from './components/Contenido/Contenido';
import RecorridoCaballo from './components/RecorridoCaballo/RecorridoCaballo';
import OchoReynas from './components/OchoReynas/OchoReynas';

function App() {
  const [seleccionado, setSeleccionado] = useState("");

  return (
    <div className="contenedor-principal">
      <button onClick={() => {
        setSeleccionado("1");
      }} className="button-choose">Marcha del caballo</button>
      <button onClick={() => {
        setSeleccionado("2");
      }} className="button-choose">8 reynas</button>
      {seleccionado === "1" ? <RecorridoCaballo></RecorridoCaballo>: null}
      {seleccionado === "2" ? <OchoReynas></OchoReynas>: null}
    </div>
  );
}

export default App;
