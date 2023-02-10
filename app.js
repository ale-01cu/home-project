
//Importando paquetes de Node
const path = require("path");

//Importtando paquetes de terceros
const express = require("express");
const app = express();
const cors = require("cors");
const colors = require("colors");
require("dotenv").config();
require("ejs");

//Importando mis paquetes
const port = process.env.PORT;

//Config de express
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//Middleware
app.use(express.text());
app.use(express.json());

//Cors
app.use(cors())

//Rutas
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/node_modules/swiper")));

app.use("/", require("./routes/home"))
app.use("/catalogo", require("./routes/catalogo"))
app.use("/formularios", require("./Routes/admin"));

//Base de Datos
const { dbConnection } = require("./db/config");
dbConnection();

app.listen(port, "10.31.103.6", () => {
    console.log(`Server escuchando en el puerto: ${colors.green(port)}`)
})
