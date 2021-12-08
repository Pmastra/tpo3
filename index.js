const express = require("express");
const bodyParser = require('body-parser');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json()); //Si recibimos un JSON, el modulo de express lo convierte automaticamente
app.use(bodyParser.urlencoded({ extended: false }));
//Rutas web
app.use(express.static("public"));
app.use('/api/tragos/', require('./router/tragos'));
app.use('/api/ingredientes/', require('./router/ingredientes'));

//Error 404
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + "/public/404.html");
});

//conexion a la base de datosss
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bar', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('conectado a mongodb'))
    .catch(e => console.log('error de conexión', e));

//Definimos el puerto para escuchar
app.listen(app.get('port'), () => {
    console.log(`Servidor en http://localhost:${app.get('port')}`);
});