import { Request, Response } from 'express';
const router= require ('express').Router();
import { userModel, loginValidate, registerValidate, generateAuthToken } from '../models/userModel';
import bcrypt from 'bcrypt';

router.post('/register',async (req:Request,res:Response)=>{
    try {
        
        const {error} =registerValidate (req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message});
        
        let user = await userModel.findOne({name:req.body.name})
        if(user)
            return res.status(409).send({message: "User with given name already exists"});
        user = await userModel.findOne({email:req.body.email})
        if(user)
            return res.status(409).send({message: "User with given email already exists"});
        
        const salt=await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword=await bcrypt.hash(req.body.password,salt)

        await new userModel({...req.body, password:hashPassword}).save()
        const usernew = await userModel.findOne({name:req.body.name})
        if(!usernew)return res.status(500).send({message: "Error creating user"});
        const token = generateAuthToken({name:usernew.name,email:usernew.email});
        return res.status(201).send({authToken: token , message:"Signed in successfully"})
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message: "Internal server error"});
    }
})


router.post('/login',async (req:Request,res:Response)=>{
    try {
        const {error} = loginValidate(req.body);
        if(error)
            return res.status(400).send({message:error.details[0].message});
        const user = await userModel.findOne({userName:req.body.userName})
        if(!user)
            return res.status(401).send({message:"User with given username does not exist"});
        const validatePassword = await bcrypt.compare(req.body.password,user.password);
        if(!validatePassword)
            return res.status(401).send({message:"Incorrect password"});
        const token = generateAuthToken({name:user.name,email:user.email});;
        res.status(200).send({authToken: token , message:"logged in successfully"})
    }catch (err)
    {
        return res.status(500).send({message: "Internal server error"});
    }
})

export  {router};