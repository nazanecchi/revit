import React from 'react';
import STLViewer from './STLViewer'; // Asegúrate de la ruta correcta

const App = () => {
  return (
    <div>
      <h1> Este es mi programa</h1>
      <STLViewer url="http://localhost:3000/mi_modelo.stl" />
    </div>
  );
};

export default App;
