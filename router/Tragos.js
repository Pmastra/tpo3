const { json } = require('express');
const express = require('express');
const router = express.Router();
const path = require('path');
const filePath = path.join(__dirname, '../');
const Trago = require('../models/trago')

router.get('/Tragos', async(req, res) => {
    try {
        const arrayTragosDB = await Trago.find();
            //console.log(arrayTragosDB)
            //console.log("hello")
        //let objet
        let json = JSON.stringify(arrayTragosDB);
        //res.json(arrayTragosDB)
        console.log("desde API: " + json)
        res.send(json);

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;