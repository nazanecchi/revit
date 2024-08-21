import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import STLViewer from './STLViewer/STLViewer'; // Importa tu componente STLViewer
import './App.css'; // Importa el archivo CSS

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/viewObject" element={<STLViewer url="http://localhost:3000/mi_modelo.stl" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

