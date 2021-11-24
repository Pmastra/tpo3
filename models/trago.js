const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tragoSchema = new Schema ({
    "idDrink": String,
    "strDrink": String,
    "strCategory": String,
    "strAlcoholic": String,
    "strInstructions": String,
    "strDrinkThumb": String,
    "ingredientes": {
        "strIngredient1": String,
        "strIngredient2": String,
        "strIngredient3": String}
})

//crear modelo
const Trago = mongoose.model('Trago', tragoSchema);

module.exports = Trago;