const { response } = require("express");
const { selectedDB } = require("../helpers/catalogo");

const vista = ( req, res = response ) => {
    res.render("formulario");
};

const guardarCategoria = async ( req, res = response) => {
    try {
        req.body.generos = req.body.generos.split(" ");
    
        const categoria = req.params.categoria;
        const model = selectedDB[ categoria ];
        const modelo = Object.assign(req.body, {imagen: req.file.path});
        const pelicula = new model( modelo );
        await pelicula.save();
        res.status(201).json({status: [{msg: 'OK'}]})

    } catch (error) {
        console.log(error);
        console.log("Ha ocurrido un error al guardar en la base de datos".red);
    } 
}


module.exports = {
    vista,
    guardarCategoria
}