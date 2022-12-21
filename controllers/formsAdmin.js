const { response } = require("express");

const pelicula = ( req, res = response ) => {
    res.render("formPelicula");
};

const serie = ( req, res = response ) => {
    res.render("formSerie");
};

const guardarPelicula = ( req, res = response) => {
    console.log(req.file);
    console.log(req.body);
    res.status(201);
}

module.exports = {
    pelicula,
    serie,
    guardarPelicula
}