import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [altura, setAltura] = useState('');
  const [ancho, setAncho] = useState('');
  const [largo, setLargo] = useState('');
  const navigate = useNavigate(); // Hook para la navegación

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/object', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ altura, ancho, largo }),
      });
      const result = await response.json();
      console.log(result.message);
      // Redirige al usuario si la respuesta es exitosa
      if (response.ok) {
        navigate('/viewObject');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <h1>Formulario de Dimensiones</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Altura"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
        />
        <input
          type="number"
          placeholder="Ancho"
          value={ancho}
          onChange={(e) => setAncho(e.target.value)}
        />
        <input
          type="number"
          placeholder="Largo"
          value={largo}
          onChange={(e) => setLargo(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Home;
