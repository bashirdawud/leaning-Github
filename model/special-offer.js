const mongoose = require('mongoose');
const schema = mongoose.Schema;

const offer = schema({
    name : {type : String, required: true},
    discount : {type : Number, required: true}
    
})
module.exports = mongoose.model('Offer', offer)
