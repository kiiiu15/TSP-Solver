const express = require('express');
const app = express();
const path = require("path");
const {router} = require("./router/routes");


app.use( express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(router);


app.listen(3000);  