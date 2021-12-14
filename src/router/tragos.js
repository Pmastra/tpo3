const express = require('express');
const router = express.Router();
const Trago = require('../models/trago');
const path = require('path');
const filePath = path.join(__dirname, '../');

router.get('/', async(req, res) => {
    try {
        const tragoBuscado = req.query.s;
        
        if(esUnNumero(req.query.limit) & esUnNumero(req.query.from)){
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
    
            res.send(JSON.stringify({ drinks: resultadoTragos }));
        } else {
            res.sendStatus(400);
        }
        
        
    } catch (error) {
        console.log(error)
    }
})

router.get('/:idTrago', async(req, res) => {
    try {
        // TODO validar que sea un numero
        const { idTrago } = req.params;

        const trago =
            await Trago.find({ "idDrink": idTrago }).exec();

        res.send(JSON.stringify({ drinks: trago }));
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async(req, res) => {
    const body = req.body;

    const entradaValida = validarEntrada(body);
    const existe = await existeTrago(body.idDrink);

    if (entradaValida && !existe) {
        try {
            await Trago.create(body);

            // TODO tiene que encargarse el frontend de resolver la redireccion
            //res.redirect('/index.html');
            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(400);
    }

});

/**
 * Verifica si existe un trago con el id parametrizado en la base de datos
 */
async function existeTrago(idTrago) {
    const tragos =
        await Trago.find({ "idDrink": idTrago }).exec();
    return (tragos && tragos.length > 0);
}

router.put('/:idTrago', async(req, res) => {
    // TODO verificar que el trago exista, se puede obenerlo y luego actualizarlo
    const { idTrago } = req.params;
    try {
        await Trago.updateOne(req.body);

        // TODO tiene que encargarse el frontend de resolver la redireccion
        //res.redirect('/index.html');
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }

});

// TODO poner un nombre mas representativo
function validarEntrada(bodyTrago) {
    return bodyTrago !== undefined && esUnNumero(bodyTrago.idDrink);
}

function esUnNumero(val) {
    return !isNaN(val);
}

module.exports = router;