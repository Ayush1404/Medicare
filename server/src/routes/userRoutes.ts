import { Request, Response } from 'express';
const router= require ('express').Router();
import { userModel, loginValidate, registerValidate, generateAuthToken } from '../models/userModel';
import bcrypt from 'bcrypt';
import { authenticatejwt } from './authMiddleWare';
import { applyDoctorValidate, doctorModel } from '../models/doctorModel';

router.post('/register',async (req:Request,res:Response)=>{
    try {
        
        const {error} =registerValidate (req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message , success:false} );
        
        let user = await userModel.findOne({name:req.body.name})
        if(user)
            return res.status(409).send({message: "User with given name already exists" , success:false});
        user = await userModel.findOne({email:req.body.email})
        if(user)
            return res.status(409).send({message: "User with given email already exists", success:false});
        
        const salt=await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword=await bcrypt.hash(req.body.password,salt)

        await new userModel({...req.body, password:hashPassword}).save()
        const usernew = await userModel.findOne({name:req.body.name})
        if(!usernew)return res.status(500).send({message: "Error creating user" , success:false});
        const token = generateAuthToken(usernew._id);
        return res.status(201).send({authToken: token , message:"Signed in successfully" , success:true})
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message: "Internal server error" , success:false});
    }
})


router.post('/login',async (req:Request,res:Response)=>{
    try {
        const {error} = loginValidate(req.body);
        if(error)
            return res.status(400).send({message:error.details[0].message , success:false});
        const user = await userModel.findOne({email:req.body.email})
        if(!user)
            return res.status(401).send({message:"User with given username does not exist", success:false});
        const validatePassword = await bcrypt.compare(req.body.password,user.password);
        if(!validatePassword) 
            return res.status(401).send({message:"Incorrect password" ,success:false});
        const token = generateAuthToken(user._id);
        res.status(200).send({authToken: token , message:"Logged in successfully", success:true})
    }catch (err)
    {
        console.log(err)
        return res.status(500).send({message: "Internal server error", success:false,err});
    }
})

router.get('/me', authenticatejwt , async (req:Request , res: Response)=>{
    try {
        const user = await userModel.findOne({_id:req.headers.id})
        if(!user) return res.status(400).send({message:"User does not exist", success:false})
        else
        {
            return res.status(200).send(
            {
                success:true,
                data:
                {
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    isDoctor:user.isDoctor,
                }
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({success:false,message:"Error getting user" ,error})
    }
})

router.post('/applydoctor', authenticatejwt , async (req:Request , res: Response)=>{
    try {
        
        const {error} =applyDoctorValidate(req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message , success:false} );
        let newDoctor = await doctorModel.findOne({userid:req.body.userid})
        if(newDoctor)
        {
            if(newDoctor.status === 'pending') return res.status(409).send({message: "Your request is already made" , success:false})
            else return res.status(409).send({message: "You are already registered as doctor" , success:false}) 
        }
        newDoctor = new doctorModel({...req.body,status:'pending'})
        
        const userAdmin = await userModel.findOne({isAdmin:true})
        if(!userAdmin)return res.status(500).send({message: "Error finding admin" , success:false});
        const unseenNotifications= userAdmin.unseenNotifications;
        unseenNotifications.push({
            type:"new-doctor-request",
            message : `${newDoctor.firstName} ${newDoctor.lastName} has applied for doctor account.`,
            data:{
                doctorId:newDoctor._id,
                name:newDoctor.firstName +' '+newDoctor.lastName
            },
            onClickPath:'/admin/doctors'
        })  
        await newDoctor.save();
        await userModel.findByIdAndUpdate(userAdmin._id , {unseenNotifications:unseenNotifications})
        res.status(200).send({message: "Applied for doctor successfully" , success:true} )
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message: "Internal server error" , success:false});
    }
})
export  {router};