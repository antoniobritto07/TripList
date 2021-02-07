const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.listen(3333, () => {
    console.log("Backend is working property...")
});