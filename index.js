const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

//conexion a la base de datosss
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bar', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('conectado a mongodb'))
    .catch(e => console.log('error de conexión', e));

// Middlewares
app.use(express.json()); //Si recibimos un JSON, el modulo de express lo convierte automaticamente

//seteamos que el view engine sea html
app.set('view engine', 'html');

//direccionamiento a todos los gets
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

//direccionamiento a la carpeta publica
app.use(express.static(__dirname + "/public"));

//Rutas web
app.use('/', require('./router/tragos'));

//Error 404
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + "/public/404.html");
});

//Definimos el puerto para escuchar
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});