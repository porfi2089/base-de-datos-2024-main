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
            'SELECT * FROM albumes WHERE albumes.id = ?',
            [albumId]
        );
        res.send(results)
    } catch (e) {
        //capturar y manejar errores
        console.log(e);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const createAlbum = async (req, res) => {
    const { nombre, artista } = req.body; // Obtener datos del cuerpo de la solicitud

    try {
        // Insertar el nuevo álbum en la base de datos
        const [result, fields] = await connection.query(
            'INSERT INTO albumes (nombre, id) VALUES (?, ?)',
            [nombre, artista]
        );
        res.send(result)
        // Obtener el ID del álbum creado
        const nuevoAlbumId = result.insertId;

        // Consultar para obtener los datos del álbum recién creado
        const [albumCreado, _] = await connection.query(
            'SELECT albumes.id, albumes.nombre AS nombre_album, artistas.nombre AS nombre_artista ' +
            'FROM albumes ' +
            'INNER JOIN artistas ON albumes.artista = artistas.id ' +
            'WHERE albumes.id = ?',
            [nuevoAlbumId]
        );
    } catch (e) {
        // Capturar y manejar errores
        console.log(e);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


const updateAlbum = async (req, res) => {
    const albumId = req.params.id; // Obtener el ID del álbum desde los parámetros de la solicitud
    const { nombre, artista } = req.body; // Obtener nombre y artista desde el cuerpo de la solicitud

    try {
        // Actualizar el álbum en la base de datos
        const [result, fields] = await connection.query(
            'UPDATE albumes SET nombre = ?, artista = ? WHERE id = ?',
            [nombre, artista, albumId]
        );

        // Verificar si se actualizó correctamente
        if (result.affectedRows > 0) {
            // Consultar para obtener los datos actualizados del álbum
            const [albumActualizado, _] = await connection.query(
                'SELECT albumes.id, albumes.nombre AS nombre_album, artistas.nombre AS nombre_artista ' +
                'FROM albumes ' +
                'INNER JOIN artistas ON albumes.artista = artistas.id ' +
                'WHERE albumes.id = ?',
                [albumId]
            );

            // Enviar la respuesta con los datos actualizados del álbum
            res.json(albumActualizado[0]);
        } else {
            res.status(404).json({ message: 'No se encontró el álbum para actualizar' });
        }
    } catch (e) {
        // Capturar y manejar errores
        console.log(e);
        res.status(500).json({ message: 'Error interno del servidor' });
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
