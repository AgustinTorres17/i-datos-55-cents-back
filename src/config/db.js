const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error al conectar con la base de datos:', err.stack);
    }
    console.log('Conectado a la base de datos');
    release();
});

pool.on('error', (err) => {
    console.error('Error en el cliente de la base de datos:', err);
});

module.exports = pool;
