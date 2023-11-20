const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: { type: String, required: [true,"products name must be provided"] },
    price : { type : Number , required : [true, "products price must be provided"]},
    featured : {type : Boolean, default : false},
    rating : {type : Number, default : 4.5},
    createdAt: {type : Date, default : Date.now()},
        company :{type : String, enum: { values:['ikea','liddy','caressa','marcos'], message : '{VALUE} is not Supported '}}
});

module.exports = mongoose.model('Products', productSchema);