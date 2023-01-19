const { check } = require('express-validator') //TODO <---
const { validateResult } = require('../helpers/validateResult');
const { Pelicula } = require("../models/Pelicula");
const { Serie } = require("../models/Serie");
const { PELICULA, SERIE } = require("../helpers/variablesGlobales")

const validateCreate = ( categoria ) => {
    let validaciones = [ //TODO: nombre 
        check("nombre")
            .exists()
            .withMessage("No existe el campo nombre.")
            .not()
            .isEmpty()
            .withMessage("El campo nombre esta vacio")
            .custom( async(value, {req}) => {
                if ( categoria === PELICULA ) {
                    const existeNombre = await Pelicula.findOne({nombre: value})
                    if ( existeNombre ) throw new Error(`El nombre ${value} ya esta registrado`);
                }else if ( categoria === SERIE ) {
                    const existeNombre = await Serie.findOne({nombre: value})
                    if ( existeNombre ) throw new Error(`El nombre ${value} ya esta registrado`);
                }
            }),
        check("ubicacion", "La ubicacion esta vacia")
            .not()
            .isEmpty(),
        check("formato", "El formato  esta vacio")
            .not()
            .isEmpty(),
        check("size", "El tamaño esta vacio")
            .not()
            .isEmpty(),
        check("fechaDeEstreno", "Fecha no valida")
            .custom( ( value, {req} ) => {
                if ( value[2] === 'none' ) throw new Error('Rellene el año de estreno.')
                else if ( value[1] === 'none') {
                    if ( value[0] !== 'none' ) throw new Error('Fecha de estreno invalida.');
                    else return true;
                }else{
                    return true;
                }
            }),
        check("generos", "Los generos estan vacios")
            .not()
            .isEmpty()
            .custom( ( value, {req} ) => {
                const generos = value.split(" ");
                const generosFiltrados = generos.filter( e => e.length > 0 )
                return generosFiltrados;
            }),
        check("actores", "Los actores estan vacios")
            .not()
            .isEmpty(),
        check("audio", "No hay ningun audio seleccionado")
            .not()
            .isEmpty(),
        check("descripcion", "La descripcion esta vacia")
            .not()
            .isEmpty(),
        check("pais", "No hay ningun pais seleccionado")
            .not()
            .isEmpty(),
        check("imagen")
            .custom(( value, {req} ) => {
                if ( !req.file ) throw new Error("No se ha mandado ninguna imagen.")
                return true;
            }),
    ];

    const validacionesSeries = [
        check("temporadas", "Las temporadas estan vacias")
            .not()
            .isEmpty(),
        check("capsPorTemporadas", "Los capitulos por temporadas estan vacios")
            .not()
            .isEmpty(),
        check("totalDeCapitulos", "No hay total de capitulos por temporadas")
            .not()
            .isEmpty(),
    ];

    if ( categoria === SERIE ) validaciones = validaciones.concat(validacionesSeries);

    validaciones.push((req, res, next) => {
        validateResult(req, res, next)
    })


    return validaciones;
} 


module.exports = { validateCreate }