import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
const joi = require('joi');
const passwordComplexity= require('joi-password-complexity');
const userSchema =new mongoose.Schema({
    name:{type:String , required: true},
    email:{type:String ,required: true},
    password:{type:String , required: true}
},{
    timestamps:true
});

export const generateAuthToken = function({name,email}:{name:string , email:string}){
    const token = jwt.sign({ name: name , email:email }, process.env.JWTPRIVATEKEY!);
    return token;
}

export const userModel = mongoose.model("users",userSchema);
export const loginValidate=(data:{})=>{
    const schema = joi.object({
        email:joi.string().email().required().label("Email"),
        password:passwordComplexity().required().label("Password")
    })
    return schema.validate(data);
}
export const registerValidate=(data:{name:string , email:string ,password:string})=>{
    const schema = joi.object({
        name:joi.string().required().label("Name"),
        email:joi.string().email().required().label("Email"),
        password:passwordComplexity().required().label("Password")
    })
    return schema.validate(data);
}


