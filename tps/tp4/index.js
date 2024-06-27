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
app.post("/albumes", albumes.createAlbum);
app.get("/albumes/:id", albumes.deleteAlbum);
app.get("/albumes/:id", albumes.updateAlbum);
app.get("/albumes/:id/cancion", albumes.getCancionesByAlbum);
 
app.get("/canciones", canciones.getCanciones);
app.get("/cancion/:id", canciones.getCancion);
app.get("/cancion/:id", canciones.updateCancion);
app.get("/cancion/:id", canciones.deleteCancion);
app.get("/cancion/:id", canciones.reproducirCancion);

app.listen(port, () => {
    console.log(`SpoTICfy API listening at http://localhost:${port}`);
});
