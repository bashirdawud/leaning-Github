const mongoose = require('mongoose');
const schema = mongoose.Schema;

const recepient = schema({
    name : {type : String, required: true},
    email : {type : String, required: true, unique: true}
    
})
module.exports = mongoose.model('Recepient', recepient)

