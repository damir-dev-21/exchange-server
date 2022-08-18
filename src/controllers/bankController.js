const bankDb = require('../models/Bank.mongo')

async function getAllBanks(){
    return  await bankDb.find({})
}

module.exports = {
    getAllBanks
}