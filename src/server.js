const express = require('express');
const app = express();
const path = require("path");
const {router} = require("./router/routes");
const child_process = require("child_process");


app.use( express.static(path.join(__dirname, "public")));
app.use("/city/selected", function(req, res, next){
   child_process.exec("python src/python/TSP_Solver.py" , err => { if (err) {console.log(err)}});
   next()
    
});

app.use(express.json());
app.use(router);


app.listen(3000);  