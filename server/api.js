const express = require('express');
const apiRouter = express.Router();
const {getAllFromDatabase} = require("./db.js")

// Minions
apiRouter.get("/minions", (req,res,next)=>{
    res.status(200).send(getAllFromDatabase("minions"))
})


module.exports = apiRouter;
