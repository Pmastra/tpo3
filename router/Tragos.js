const { json } = require('express');
const express = require('express');
const router = express.Router();
const path = require('path');
const filePath = path.join(__dirname, '../');
const Trago = require('../models/trago')

router.get('/Tragos', async(req, res) => {
    try {
        const arrayTragosDB = await Trago.find();
        let objeto = { drinks: arrayTragosDB }
        let json = JSON.stringify(objeto);
        res.send(json);
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;