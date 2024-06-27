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
            'INNER JOIN artistas ON albumes.artista_id = artistas.id ' +
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
    // Completar con la consulta que crea un album
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
};

const updateAlbum = async (req, res) => {
    // Completar con la consulta que actualiza un album
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
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
