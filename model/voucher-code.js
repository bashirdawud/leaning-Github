const mongoose = require('mongoose');
const bcyrpt = require('bcrypt');
const schema = mongoose.Schema;

const voucher = schema({
    code : {type : String, required: true},
    recepient : {type : Schema.Types.ObjectId,  ref: 'Recepient'},
    offer : {type : Schema.Types.ObjectId,  ref: 'Offer'},
    used : {type: Boolean, default: false},
    track : {type: Date},
    expiryDate: {type: Date}
    
})

voucher.pre("save", function(next){
    const mycode = this;
    if(this.isModified("code") || this.isNew){
        bcyrpt.genSalt(10, function(err, salt){
            if(err){
                return next(err);
            }
            bcyrpt.hash(mycode.code, salt, (err, hash) => {
                if(err){
                    return next(err);
                }
                mycode.code = hash;
                next();
                
            })
        })
    }
    else{
        return next();
    }
})

voucher.methods.compareCode = function(code, next){
    bcyrpt.compare(code, this.code, function(err, result){
        if(err){
            return next(err);
        }
        next(null, result);
    } )
}
module.exports = mongoose.model('voucher', voucher)
