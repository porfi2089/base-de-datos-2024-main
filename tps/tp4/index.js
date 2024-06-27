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

app.get("/artista/:id", artistas.getArtista);

app.get("/albumes", albumes.getAlbumes);
app.get("/albumes/:id", albumes.getAlbum);
app.get("/create-album/:nombre", albumes.createAlbum);
app.get("/delete-album/:id", albumes.deleteAlbum);
app.get("/update-album/:id", albumes.updateAlbum);
app.get("/canciones-by-album/:id", albumes.getCancionesByAlbum);
 
app.get("/canciones", canciones.getCanciones);
app.get("/cancion/:id", canciones.getCancion);
app.get("/update-cancion/:id", canciones.updateCancion);
app.get("/delete-cancion/:id", canciones.deleteCancion);
app.get("/reproducir-cancion/id", canciones.reproducirCancion);

app.listen(port, () => {
    console.log(`SpoTICfy API listening at http://localhost:${port}`);
});
