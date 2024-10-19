require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

// Middleware para manejar JSON
app.use(express.json());
app.use(cors());

// Importar rutas
const nbaRoutes = require('./src/routes/index');

// Usar las rutas
app.use('/api', nbaRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor Express funcionando');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
