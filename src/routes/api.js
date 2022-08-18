const express = require('express')
const {getAllBanks} = require('../controllers/bankController')
// const {} = require('')

const exchangeRouter = express.Router()

exchangeRouter.get("/",async (req,res)=>{
    return res.status(200).json( await getAllBanks())
})

module.exports = exchangeRouter