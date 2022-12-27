const { response } = require("express");
const Pelicula = require("../models/Pelicula");
const Serie = require("../models/Serie");

const pelicula = ( req, res = response ) => {
    res.render("formPelicula");
};

const serie = ( req, res = response ) => {
    res.render("formSerie");
};

const guardarPelicula = async ( req, res = response) => {

    const modelo = Object.assign(req.body, {imagen: req.file.path});
    const pelicula = new Pelicula( modelo );
    await pelicula.save();
    res.status(201).json({status: [{msg: 'OK'}]})
 
}

const guardarSerie = async ( req, res = response ) => {

    const modelo = Object.assign(req.body, {imagen: req.file.path});
    const serie = new Serie( modelo );
    await serie.save();
    res.status(201).json({status: [{msg: 'OK'}]})

}

module.exports = {
    pelicula,
    serie,
    guardarPelicula,
    guardarSerie
}