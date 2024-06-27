import express from "express";
const app = express();
const port = 3000;

import artistas from "./controllers/artistas.js";
import albumes from "./controllers/albumes.js";
import canciones from "./controllers/canciones.js";

app.use(express.json());

app.get("/", (_, res) => {
    res.send("SpoTICfy API working!");
});

/* ------------------- Rutas ------------------- */

artistas.getArtistas;
artistas.getArtista;

albumes.getAlbumes;
albumes.getAlbum;
albumes.createAlbum
albumes.deleteAlbum
albumes.updateAlbum
albumes.getCancionesByAlbum
albumes.

canciones.getCanciones;
canciones.getCancion;
canciones.updateCancion;
canciones.deleteCancion;
canciones.reproducirCancion;

app.listen(port, () => {
    console.log(`SpoTICfy API listening at http://localhost:${port}`);
});
