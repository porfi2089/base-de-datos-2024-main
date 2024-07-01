import mysql from "mysql2/promise";

 const connection = await mysql.createConnection({
    user:'AlumnosOrt',
    password: 'TP4',
    host: 'localhost',
    database:'spoticfy'
});
const getAlbumes = async (_, res) => {

const [rows, fields] = await conn.query("SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes JOIN artistas ON artistas.id = albumes.artista");
        res.json(rows);
};

const getAlbum = async (req, res) => {
    const albumId = req.params.id; //obtener el ID del álbum desde los parámetros de la solicitud

    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM albumes WHERE id = ?',
            [albumId]
        );
        res.send(results[0])
    } catch (e) {
        //capturar y manejar errores
        console.log(e);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const createAlbum = async (req, res) => {
    const nombre = req.body.nombre;
    const artista = req.body.artista;
    // Ejecutar la consulta para insertar un nuevo álbum
    const [result, fields] = await connection.query('INSERT INTO albumes (albumes.nombre, albumes.artista) VALUES (?, ?)', [nombre, artista]);        
    res.send("Álbum creado correctamente");
};


const updateAlbum = async (req, res) => {//no estoy seguro
    const id = req.params.id;  
    const nombre = req.body.nombre; 
    const idartista = req.body.artista;
    const [rows, fields] = await conn.query("UPDATE albumes SET albumes.nombre = ?, albumes.artista = ? WHERE id = ? ", [nombre, idartista, id]);
    res.send("Se a realizado la actualizacion");
};



const deleteAlbum = async (req, res) => {
    // Completar con la consulta que elimina un album
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    const id = req.params.id;

    const [rows, fields] = await conn.query("DELETE FROM albumes WHERE id = ? ", [id]);
    //para chequear que se haya realizado de manera correcta
    res.send ("El pedido de eliminar se hecho de manera correcta");

};

const getCancionesByAlbum = async (req, res) => {
    // Completar con la consulta que devuelve las canciones de un album
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
    const id = req.params.id;

    const [rows, fields] = await conn.query("SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones FROM albumes JOIN artistas ON artistas.id = albumes.artista JOIN canciones ON canciones.album = albumes.id WHERE albumes.id = ?", [id])
    //chequear que se haya realizado correcto
    res.json(rows); 
};

const albumes = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};

export default albumes;
