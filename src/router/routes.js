const express = require('express');
const router = express.Router();
const {Controller} = require("../controllers/controller");


router.get("/city", Controller.getData);
router.get("/city/selected", Controller.getSelected);
router.post("/city", Controller.addCity);
router.delete("/city", Controller.DeleteCity);



module.exports = {router};


