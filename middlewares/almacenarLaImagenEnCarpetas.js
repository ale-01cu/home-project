const path = require("path");
const fs = require("fs");
const multer = require("multer");

module.exports = categoria  => {
    const storage = multer.diskStorage({
        destination: async ( req, file, cb ) => {
            // Crea la carpeta de la Categoria especifica automatico
            if(fs.existsSync(`/../uploads/${categoria}` == false)){
                console.log("no existe la carpeta peliculas");
                await fs.mkdir( path.join( __dirname, `/../uploads/${categoria}`), err =>  {});
                await fs.mkdir( path.join( __dirname, `/../uploads/Peliculas/${req.body.nombre}`), err => {})
                cb(null, path.join(__dirname, `/../uploads/Peliculas/${req.body.nombre}`));

            }else{
                console.log("existe la carpeta peliculas");
                // Crea la carpeta de la Pelicula con su nombre
                if( fs.existsSync(`/../uploads/Peliculas/${req.body.nombre}`) == false ) {
                    console.log("no existe la carpeta " + req.body.nombre);
                    await fs.mkdir( path.join( __dirname, `/../uploads/Peliculas/${req.body.nombre}`), err => {})
                    // Guarda la imagen dentro de la carpeta de la pelicula
                    cb(null, path.join(__dirname, `/../uploads/Peliculas/${req.body.nombre}`));
                }else{
                    // Guarda la imagen dentro de la carpeta de la pelicula
                    cb(null, path.join(__dirname, `/../uploads/Peliculas/${req.body.nombre}`));
                    console.log("Ya Existe una carpeta con el nombre " + req.body.nombre);
                }
            }
        }, 
        filename: ( req, file, cb ) => {
            const fecha = new Date();
            // Da un nombre y un formato a la imagen
            cb ( null, file.originalname )
        }
    })

    return multer({ storage }).single("imagen");
}
