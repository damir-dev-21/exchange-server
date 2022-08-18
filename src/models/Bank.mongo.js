const mongoose = require('mongoose')

const bankSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    results:{
        type: Array,
        default:[],
        required:true
    }
})

module.exports = mongoose.model('Bank',bankSchema)