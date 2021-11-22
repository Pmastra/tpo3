const express = require("express");
const app = express();
const port = 3000;

app.set('view engine', 'html');

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.send("index");
});

app.get("/contacto", (req, res) => {
    res.send(__dirname);
});

app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + "/public/api/404.html");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});