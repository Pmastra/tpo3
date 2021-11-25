const express = require('express');
const router = express.Router();
const path = require('path');
const filePath = path.join(__dirname, '../');
const Trago = require('../models/trago')

router.get('/Tragos', async(req, res) => {
    try {
        const arrayTragosDB = await Trago.find()
            //console.log(arrayTragosDB)
            //console.log("hello")

        res.send(JSON.stringify(arrayTragosDB))

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;