import mysql from 'mysql2/promise';

const config = useRuntimeConfig();

export const pool = mysql.createPool({
    host: config.dbHost,
    port: config.dbPort,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    charset: 'UTF8MB4_GENERAL_CI'
});