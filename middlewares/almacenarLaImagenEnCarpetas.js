const path = require("path");
const fs = require("fs");
const multer = require("multer");
const colors = require("colors");

module.exports = categoria  => {
    const storage = multer.diskStorage({
        destination: async ( req, file, cb ) => {
            // Crea la carpeta de la Categoria especifica automatico
            if( fs.existsSync( path.join( __dirname, `/../uploads/${categoria}`) ) ) {
                if( fs.existsSync(  path.join( __dirname, `/../uploads/${categoria}/${req.body.nombre}`) ) == false ) {
                    // Crea la carpeta de la Pelicula con su nombre
                    await fs.mkdir( path.join( __dirname, `/../uploads/${categoria}/${req.body.nombre}`), err => {});
                    console.log(`Se ha agregado ${colors.cyan(req.body.nombre)} a ${colors.cyan(categoria)}`);
                }else{
                    console.log(`Ya existe ${colors.cyan(req.body.nombre)} dentro de ${colors.cyan(categoria)}, se ha remplazado la imagen.`);
                }
            // Caso de que no exita la carpeta de la categoria
            }else{
                await fs.mkdir( path.join( __dirname, `/../uploads/${categoria}`), err =>  {});
                await fs.mkdir( path.join( __dirname, `/../uploads/${categoria}/${req.body.nombre}`), err => {});
                console.log(`Se ha creado la carpeta ${colors.cyan(categoria)} y se le ha agregado ${colors.cyan(req.body.nombre)}`);
            }

            // Guarda la imagen dentro de la carpeta de la pelicula
            cb(null, path.join(__dirname, `/../uploads/${categoria}/${req.body.nombre}`));

        }, 
        filename: ( req, file, cb ) => {
            const fecha = new Date();
            // Da un nombre y un formato a la imagen
            cb ( null, file.originalname );
        }
    })

    return multer({ storage }).single("imagen");
}
