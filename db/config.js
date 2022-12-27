const mongoose = require("mongoose");
require("colors");

const dbConnection = async () => {

    const URL_DATABASE = process.env.MONGODB_CNN;
    mongoose.set("strictQuery", true);

    try {
        await mongoose.connect(URL_DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } );
        console.log("Conexion establecida con la base de datos.");

    } catch (error) {
        console.log(error);
        console.log("No se Pudo conectar con la Base de Datos".red);
    }


}


module.exports = {
    dbConnection
}