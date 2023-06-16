const mongoose = require('mongoose')
const { stringify } = require('querystring')
const familySchema =new mongoose.Schema({

    fatheName:{
        type: String
    },

    motherName:{
        type: String
    },

    children:{
        type: Array
    },

    pictures:{
        type: Array
    }
})
const familymodel = mongoose.model('Family', familySchema)
module.exports = familymodel