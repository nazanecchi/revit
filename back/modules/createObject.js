const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

async function createObject(req, res) {
  const { height, width, length, roofheight } = req.body;

  // Guarda los datos en un archivo
  fs.writeFileSync('objectData.txt', `height: ${height}\nwidth: ${width}\nlength: ${length}\nrooflheight: ${roofheight}`);

  // Define el directorio en el que se ejecutará el script Python
  const pythonDir = path.resolve(__dirname, '../python');

  // Ejecuta el script Python en el directorio especificado
  const pythonProcess = exec(`cd ${pythonDir} && freecadcmd main.py`, { 
    encoding: 'utf8', 
    shell: true // Necesario para usar `&&` en exec
  });

  // Variable para verificar si se ha enviado una respuesta
  let responseSent = false;

  // Envía los datos al script Python
  const a = JSON.stringify({ height, width, length, roofheight })
  pythonProcess.stdin.write(a);
  console.log("enviamos: " + a)
  pythonProcess.stdin.end();

  // Maneja la salida del script Python
  pythonProcess.stdout.on('data', (data) => {
    if (!responseSent) {
      responseSent = true;
      res.json({ message: data.trim() });
    }
  });

  // Maneja errores del script Python
  pythonProcess.stderr.on('data', (data) => {
    if (!responseSent) {
      responseSent = true;
      console.error(`stderr: ${data}`);
      res.status(500).json({ message: 'Error al ejecutar el script de Python', error: data });
    }
  });

  // Maneja el caso en que el script Python termina sin errores pero sin salida
  pythonProcess.on('close', (code) => {
    if (!responseSent) {
      responseSent = true;
      if (code !== 0) {
        res.status(500).json({ message: 'El script de Python terminó con errores', code });
      }
    }
  });
}

module.exports = createObject;
