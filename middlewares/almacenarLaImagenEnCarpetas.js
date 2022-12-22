const path = require("path");
const fs = require("fs");
const multer = require("multer");

module.exports = categoria  => {
    const storage = multer.diskStorage({
        destination: async ( req, file, cb ) => {
            // Crea la carpeta de la Categoria especifica automatico
            console.log(fs.existsSync( path.join( __dirname, `/../uploads/${categoria}`) ));
            if( fs.existsSync( path.join( __dirname, `/../uploads/${categoria}`) ) ) {
                console.log("existe la carpeta peliculas");
                if( fs.existsSync(  path.join( __dirname, `/../uploads/Peliculas/${req.body.nombre}`) ) == false ) {
                    console.log("No Existe la carpeta con el nombre " + req.body.nombre);
                    // Crea la carpeta de la Pelicula con su nombre
                    await fs.mkdir( path.join( __dirname, `/../uploads/Peliculas/${req.body.nombre}`), err => {})
                }
            // Caso de que no exita la carpeta de la categoria
            }else{
                console.log("no existe la carpeta " + categoria);
                await fs.mkdir( path.join( __dirname, `/../uploads/${categoria}`), err =>  {});
                await fs.mkdir( path.join( __dirname, `/../uploads/Peliculas/${req.body.nombre}`), err => {})
            }

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
