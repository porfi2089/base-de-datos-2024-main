import mysql from "mysql2/promise";

export const conn = await mysql.createConnection({
    user:'AlumnosOrt',
    password: 'TP4',
    host: 'localhost',
    database:'spoticfy'
});
