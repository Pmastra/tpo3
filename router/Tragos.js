const express = require('express');
const router = express.Router();
const Trago = require('../models/trago')
const path = require('path');
const filePath = path.join(__dirname, '../');

router.get('/Tragos', async(req, res) => {
    try {
        let tragoBuscado = req.query.s;

        let tragos = [];
        if (tragoBuscado == "") {
            tragos = await Trago.find();
        } else {
            let tragosNormal =
                await Trago.find({ "strDrink": { $regex: '.*' + tragoBuscado + '.*' } }).exec();

            /*
            let tragosMayuscula =
                await Trago.find({ "strDrink": { $regex: '.*' + tragoBuscado.toUpperCase() + '.*' } }).exec();

            let tragosMinuscula =
                await Trago.find({ "strDrink": { $regex: '.*' + tragoBuscado.toLowerCase() + '.*' } }).exec();

            tragos = [...tragosNormal, ...tragosMayuscula, ...tragosMinuscula];
            */
            tragos = tragosNormal;
        }

        let objeto = { drinks: tragos }
        let json = JSON.stringify(objeto);
        res.send(json);
    } catch (error) {
        console.log(error)
    }
})

router.get('/crear', (req, res) => {
    res.sendFile(filePath + '/public/crear.html')
});

router.get('/trago', async(req, res) => {
    try {
        let idTrago = req.query.i;

        console.log("idTrago: " + idTrago);

        let tragos =
            await Trago.find({ "idDrink": idTrago }).exec();
        console.log("trago: " + tragos);

        let objeto = { drinks: tragos }
        let json = JSON.stringify(objeto);
        res.send(json);
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async(req, res) => {
    const body = req.body;

    if (validarEntrada(body)) {
        let tragos =
            await Trago.find({ "idDrink": body.idDrink }).exec();

        // si el trago no existe lo inserta el la base de datos
        if (tragos === undefined || tragos.length == 0) {
            try {
                await Trago.create(body);

                res.redirect('/index.html');
            } catch (error) {
                console.log(error);
            } 
        } else {
            res.redirect('/404.html');
        }
    } else {
        res.redirect('/404.html');
    }
});


router.put('/trago', async(req, res) => { 

    
    try {
        await Trago.updateOne(req.body);

        res.redirect('/index.html');
    } catch (error) {
        console.log(error)
    }

});

function validarEntrada(bodyTrago) {
    return bodyTrago !== undefined && Number.isInteger(bodyTrago.idDrink);
}

module.exports = router;