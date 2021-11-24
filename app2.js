const express = require("express");
const app = express();
const port = 3000;

//conexion a la base de datosss
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bar', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('conectado a mongodb'))
    .catch(e => console.log('error de conexión', e));

//seteamos que el view engine sea html
app.set('view engine', 'html');

//direccionamiento a la carpeta publica
app.use(express.static(__dirname + "/public"));


//direccionamiento a todos los gets
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/api/index.html");
});

app.get("/contacto", (req, res) => {
    res.sendFile(__dirname + "/public/api/index.html");
});

//Necesitamos pasar el id como parametro para cualquier tipo de GET que comience con trago*
app.get("/trago*", (req, res) => {
    res.sendFile(__dirname + "/public/api/trago.html?id=");
});

app.get('/styles/estilos.css', function(req, res) {
    res.sendFile(__dirname + "/public/api/styles/estilos.css");
});

app.get('/styles/trago.css', function(req, res) {
    res.sendFile(__dirname + "/public/api/styles/trago.css");
});

app.get('/scripts/api.js', function(req, res) {
    res.sendFile(__dirname + "/public/api/scripts/api.js");
});

app.get('/scripts/main.js', function(req, res) {
    res.sendFile(__dirname + "/public/api/scripts/main.js");
});

app.get('/scripts/trago.js', function(req, res) {
    res.sendFile(__dirname + "/public/api/scripts/trago.js");
});


//Error 404
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + "/public/api/404.html");
});

//Definimos el puerto para escuchar
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});