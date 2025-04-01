const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(helmet()); // Agrega encabezados de seguridad
app.use(cors());
app.use(express.static(path.join(__dirname, './')));

const PORT = process.env.PORT || 8080;

// Para desarrollo local puedes usar HTTP
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

// Para producción, configura HTTPS (necesitarás certificados)
// const options = {
//   key: fs.readFileSync('clave-privada.key'),
//   cert: fs.readFileSync('certificado.crt')
// };
// https.createServer(options, app).listen(443);
