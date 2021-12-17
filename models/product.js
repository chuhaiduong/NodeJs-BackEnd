import mongoose from 'mongoose';
const productSchema = mongoose.Schema({
    name:{
        type:String,
        strim:true,
        maxLength:32,
        required:true
    },
    description:{
        type:String,
      
        maxLength:2000
    },
    image:{
        type:String
    },
  
    price:{
        type:String
    },
    discount:{
        type:String
    }
 

},{timeStamps:true});

module.exports = mongoose.model("Product",productSchema)