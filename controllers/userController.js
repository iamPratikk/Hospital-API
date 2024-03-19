const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const jwt = require('jsonwebtoken');

//This action is used to register a doctor using it name and password
module.exports.registerDoctor = async (req,res)=>{
    try{
        const doctor = await Doctor.create(req.body);
        if(doctor){
            res.status(200).json({
                succes : true,
                message : "Successfully created a doctor"
            })
        }
    }catch(err){
        res.status(500).json({
            success : false,
            message : "Error in creating doctor"
        })
    }
}

//This action is user to authenticate the Doctor from DB and generate a JWT for future verification
module.exports.login = async(req,res,next)=>{
    try{
        const { name, password } = req.body;
        const user = await Doctor.findOne({ name, password });
        if(user){
            console.log(user)
            const token = jwt.sign(user.toJSON() ,"secret", {expiresIn : 100000});
            res.status(200).json({
                success : true,
                message : "Your JWT is below",
                data : token
            })
        }else{
            res.status(404).json({
                success : false,
                message : "Username or password is incorrect"
            })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}