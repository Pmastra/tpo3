const express = require('express');
const router = express.Router();

app.get("/", (req, res) => {
    res.send("index");
});

app.get("/contacto", (req, res) => {
    res.send(__dirname);
});

module.exports = router;