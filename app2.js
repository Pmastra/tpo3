const express = require("express");
const app = express();
const port = 3000;

app.set('view engine', 'html');

app.get("/", (req, res) => {
  res.send("index");
});

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/404.html");
});

app.get("/contacto", (req, res) => {
  res.send(__dirname);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});