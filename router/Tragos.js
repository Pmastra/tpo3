const express = require('express');
const router = express.Router();
const Trago = require('../models/trago');
const path = require('path');
const filePath = path.join(__dirname, '../');

router.get('/', async(req, res) => {
    try {
        let tragoBuscado = req.query.s;
        let limit = Number(req.query.limit);
        let from = Number(req.query.from);
        if (!limit) {
            limit = 10;
        }
        if (!from) {
            from = 0;
        }

        let resultadoTragos = [];
        if (!tragoBuscado || tragoBuscado == "") {
            resultadoTragos = await Trago.find().limit(limit).skip(from);
        } else {
            resultadoTragos =
                await Trago.find({ "strDrink": { $regex: '.*' + tragoBuscado + '.*' } })
                .limit(limit).skip(from).exec();
        }

        let objeto = { drinks: resultadoTragos }
        let json = JSON.stringify(objeto);
        res.send(json);
    } catch (error) {
        console.log(error)
    }
})

router.get('/:idTrago', async(req, res) => {
    try {
        const { idTrago } = req.params;
        console.log("idTrago: " + idTrago);

        let trago =
            await Trago.find({ "idDrink": idTrago }).exec();

        let objeto = { drinks: trago }
        let json = JSON.stringify(objeto);
        res.send(json);
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async(req, res) => {
    const body = req.body;
    console.log("post en /tragos con id: " + body.idDrink);

    let entradaValida = validarEntrada(body);
    let existe = await existeTrago(body.idDrink);
    //console.log("entrada " + body + " es valida? " + entradaValida);
    console.log("existe Trago? " + existe);

    if (entradaValida && !existe) {
        try {
            await Trago.create(body);

            res.redirect('/index.html');
            //res.sendStatus(200);
        } catch (error) {
            console.log(error);
        }
    } else {
        //res.redirect('/404.html');
        res.sendStatus(400);
    }

});

/**
 * Verifica si existe un trago con el id parametrizado en la base de datos
 */
async function existeTrago(idTrago) {
    let tragos =
        await Trago.find({ "idDrink": idTrago }).exec();
    return (tragos && tragos.length > 0);
}

router.put('/:idTrago', async(req, res) => {
    const { idTrago } = req.params;
    console.log("idTrago: " + idTrago);
    try {
        await Trago.updateOne(req.body);

        //res.redirect('/index.html');
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
    }

});

function validarEntrada(bodyTrago) {
    return bodyTrago !== undefined && esUnNumero(bodyTrago.idDrink);
}

function esUnNumero(val) {
    return !isNaN(val);
}

module.exports = router;