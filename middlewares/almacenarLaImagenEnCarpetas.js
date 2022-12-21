const path = require("path");
const fs = require("fs");
const multer = require("multer");

module.exports = categoria  => {
    const storage = multer.diskStorage({
        destination: async ( req, file, cb ) => {
            // Crea la carpeta de la Categoria especifica automatico
            await fs.mkdir( path.join( __dirname, `/../uploads/${categoria}`), err =>  {
                if (err) console.log(`Ya Existe la carpeta ${categoria}...!!!`);
            })
            // Crea la carpeta de la Pelicula con su nombre
            await fs.mkdir( path.join( __dirname, `/../uploads/Peliculas/${req.body.nombre}`), err => {
                if (err) console.log("Ya Existe la Carpeta " + req.body.nombre);
            })
            // Guarda la imagen dentro de la carpeta de la pelicula
            cb(null, path.join(__dirname, `/../uploads/Peliculas/${req.body.nombre}`));
        }, 
        filename: ( req, file, cb ) => {
            const fecha = new Date();
            // Da un nombre y un formato a la imagen
            cb ( null, file.originalname )
        }
    })

    return multer({ storage }).single("imagen");
}
