const express = require('express');
const router = express.Router();

const Trago = require('../models/trago')

router.get('/', async (req, res) => {
    try{
        const arrayTragosDB = await Trago.find()
        console.log(arrayTragosDB)
    } catch (error) {
        console.log(error)
    }
})