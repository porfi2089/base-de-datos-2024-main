import { conn } from "../db.js";

const getAlbumes = async (req, res) => {
        try{
            const [results, fields] = await connection.query(
                'SELECT * FROM albumes INNER JOIN artistas ON albumes.artista = artistas.id'
            );    
        } catch (e) {
            console.log(e);
        }
};

const getAlbum = async (req, res) => {
    const albumId = req.params.id; //obtener el ID del álbum desde los parámetros de la solicitud

    try {
        const [results, fields] = await connection.query(
            'SELECT albumes.id, albumes.nombre AS nombre_album, artistas.nombre AS nombre_artista ' +
            'FROM albumes ' +
            'INNER JOIN artistas ON albumes.artista = artistas.id ' +
            'WHERE albumes.id = ?',
            [albumId]
        );

        if (results.length > 0) {
            //si se encontró el álbum, devolverlo en formato JSON
            const album = {
                id: results[0].id,
                nombre: results[0].nombre_album,
                nombre_artista: results[0].nombre_artista
            };
            res.json(album);
        } else {
            //si no se encontro el álbum, devolver un mensaje de error
            res.status(404).json({ message: 'Álbum no encontrado' });
        }
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

        if (albumCreado.length > 0) {
            // Si se encontró el álbum creado, devolverlo en formato JSON
            const album = {
                id: albumCreado[0].id,
                nombre: albumCreado[0].nombre_album,
                nombre_artista: albumCreado[0].nombre_artista
            };
            res.status(201).json(album); // Devolver el álbum creado con código de estado 201 (Created)
        } else {
            // Si no se encuentra el álbum creado (esto debería ser imposible si la inserción fue exitosa)
            res.status(500).json({ message: 'No se pudo obtener el álbum creado' });
        }
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

            if (albumActualizado.length > 0) {
                // Si se encontró el álbum actualizado, devolverlo en formato JSON
                const album = {
                    id: albumActualizado[0].id,
                    nombre: albumActualizado[0].nombre_album,
                    nombre_artista: albumActualizado[0].nombre_artista
                };
                res.status(200).json(album); // Devolver el álbum actualizado con código de estado 200 (OK)
            } else {
                // Si no se encuentra el álbum actualizado (esto debería ser imposible si la actualización fue exitosa)
                res.status(500).json({ message: 'No se pudo obtener el álbum actualizado' });
            }
        } else {
            // Si no se afectó ninguna fila (posiblemente porque el álbum con ese ID no existe)
            res.status(404).json({ message: 'Álbum no encontrado' });
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
