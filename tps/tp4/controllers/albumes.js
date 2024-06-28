import mysql from "mysql2/promise";

 const connection = await mysql.createConnection({
    user:'AlumnosOrt',
    password: 'TP4',
    host: 'localhost',
    database:'spoticfy'
});

const getAlbumes = async (req, res) => {
        try{
            const [results, fields] = await connection.query(
                'SELECT * FROM albumes INNER JOIN artistas ON albumes.artista = artistas.id'
            );    
            res.send(results)
        } catch (e) {
            console.log(e);
        }
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


const updateAlbum = async (req, res) => {//fakta
    const albumId = req.params.id; // Obtener el ID del álbum desde los parámetros de la solicitud
    const nombre = req.body.nombre; // Obtener el nombre desde el cuerpo de la solicitud
    const idartista = req.body.artista; // Obtener el artista desde el cuerpo de la solicitud

    try {
        // Actualizar el álbum en la base de datos
        const [result, fields] = await connection.query(
            'UPDATE albumes SET nombre = ?, artista = ? WHERE id = ?',
            [nombre, idartista, albumId]
        );

        // Verificar si se actualizó correctamente
        if (result.affectedRows > 0) {
            // Enviar una respuesta indicando que la actualización fue exitosa
            res.send('Álbum actualizado exitosamente');
        } else {
            res.status(404).send('No se encontró el álbum para actualizar');
        }
    } catch (e) {
        // Capturar y manejar errores
        console.log(e);
        res.status(500).send('Error interno del servidor');
    }
};



const deleteAlbum = async (req, res) => {
    // Completar con la consulta que elimina un album
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params

};

const getCancionesByAlbum = async (req, res) => {
    // Completar con la consulta que devuelve las canciones de un album
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
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
