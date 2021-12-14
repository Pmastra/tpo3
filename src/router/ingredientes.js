const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?i=';
const urlImagenes = 'https://www.thecocktaildb.com/images/ingredients/';

router.get('/:nombreIngrediente', async(req, res) => {
    try {
        const { nombreIngrediente } = req.params;

        fetch(url + nombreIngrediente)
            .then(resultado => resultado.json())
            .then(datos => {
                datos.ingredients[0].image = `${urlImagenes}${datos.ingredients[0].strIngredient}.png`;
                
                let json = JSON.stringify(datos);
                res.status(200);
                res.send(json);
            })
            .catch(error => {
                res.status(500);
                res.send(error);
            });

    } catch (error) {
        res.status(500);
        res.send(error);
    }
});

module.exports = router;