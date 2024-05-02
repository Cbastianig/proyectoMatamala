require('dotenv').config();
const mysql = require('mysql2');

// Crea una instancia del cliente SSH



const dbServer = {
    host: process.env.DB_SSH_HOST,
    port:  process.env.DB_PORT,
    user: process.env.DB_SSH_USER,
    password:process.env.DB_SSH_PASS,
};




const updatedDbServer = {
    ...dbServer,
    connectionLimit: 5,
    waitForConnections: true,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
};

// Crea un pool de MySQL con la configuración de updatedDbServer
const pool = mysql.createPool(updatedDbServer);
// Verifica si la creación del pool fue exitosa
export function connect() {
    return pool.promise();
}
