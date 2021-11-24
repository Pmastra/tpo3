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

//Rutas web
app.use('/', require('./router/rutasWeb'));
app.use('/', require('./router/Tragos'));

//Error 404
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + "/public/404.html");
});

//Definimos el puerto para escuchar
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});