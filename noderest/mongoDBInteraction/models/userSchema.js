// require("dotenv").config({path:"./config.env"});
const jwt=require("jsonwebtoken")
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken")
const dotenv = require("dotenv");

// schema for user and doctor registration
const UserSchema = new mongoose.Schema({
    username: String,
    role:String,
    password:  String,
    digitalAddress:String,   

    // dob : String,
    // licenseId:String,
    // cor:String,
   
    // tokens:String,
    // email:String,
    // weight:Number,
    // address:String,
    // contact:Number,
    // patinetMedDet:String,
    // companyName:String,
    // policyNumber:String,
    // gender:String,
    // email:String,
    // did:String
    // Credentials:Object,
    // docDigiAddress:Number

    // tokens : [
    //     {
    //         token:{
    //             type:String,
    //             required:true
    //         }
    //     }
    // ]

})

//generating a token
UserSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this.id,role:this.role,digitalAddress:this.digitalAddress},process.env.SECRET_KEY);
        // this.tokens = this.tokens.concat({token:token})
        if(!this.tokens){
            this.tokens = token;
        }
        
        const decoded = jwt.decode(token);
        // const verified = jwt.verify(token,process.env.SECRET_KEY)
        // console.log(decoded._id)
        await this.save();
        return token;
    }catch{
        console.log(err)
    }
}

var User = mongoose.model("User", UserSchema);

module.exports = User;
