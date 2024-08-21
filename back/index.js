const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const createObject = require('./modules/createObject'); // Asegúrate de la ruta correcta

const app = express();
const port = 5000;

app.use(cors());

// Middleware para parsear JSON
app.use(bodyParser.json());

// Define la ruta que recibe los datos
app.post('/api/object', createObject);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
