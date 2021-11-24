const express = require('express');
const router = express.Router();
const path = require('path');
const filePath = path.join(__dirname, '../');

//direccionamiento a todos los gets
router.get('/', (req, res) => {
    res.sendFile(filePath + '/public/index.html')
})

//Necesitamos pasar el id como parametro para cualquier tipo de GET que comience con trago*
router.get('/trago*', (req, res) => {
    res.sendFile(filePath + '/public/trago.html?id=')
})

router.get('/styles/estilos.css', function(req, res) {
    res.sendFile(filePath + '/public/styles/estilos.css')
})

router.get('/styles/trago.css', function(req, res) {
    res.sendFile(filePath + '/public/styles/trago.css')
})

router.get('/scripts/api.js', function(req, res) {
    res.sendFile(filePath + '/public/scripts/api.js')
})

router.get('/scripts/main.js', function(req, res) {
    res.sendFile(filePath + '/public/scripts/main.js')
})

router.get('/scripts/trago.js', function(req, res) {
    res.sendFile(filePath + '/public/scripts/trago.js')
})

module.exports = router;