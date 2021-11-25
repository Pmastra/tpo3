const { json } = require('express');
const express = require('express');
const router = express.Router();
const path = require('path');
const filePath = path.join(__dirname, '../');
const Trago = require('../models/trago')

router.get('/Tragos', async(req, res) => {
    try {
        let tragoBuscado = req.query.s;
        

        let tragos = [];
        if (tragoBuscado == "") {
            console.log("tragoBuscado is empty");
            tragos = await Trago.find();
        } else {
            console.log("tragoBuscado = " + tragoBuscado);
            let tragosNormal = 
            await Trago.find({ "strDrink": { $regex: '.*' + tragoBuscado + '.*' }}).exec();

            let tragosMayuscula = 
                await Trago.find({ "strDrink": { $regex: '.*' + tragoBuscado.toUpperCase() + '.*' }}).exec();

            let tragosMinuscula = 
                await Trago.find({ "strDrink": { $regex: '.*' + tragoBuscado.toLowerCase() + '.*' }}).exec();

            tragos = [...tragosNormal, ...tragosMayuscula, ...tragosMinuscula];
        }

        console.log("tragos = " + tragos);
        
        let objeto = { drinks: tragos }
        let json = JSON.stringify(objeto);
        res.send(json);
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;