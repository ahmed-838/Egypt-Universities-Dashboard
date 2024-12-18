const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/',async(req,res)=>{

    try{
        if(!req.body.email || !req.body.password){
            res.status(400).json({message:"Email and password are required"});
        }

    const {email,password} = req.body;
    // console.log("email",email);
    // console.log("password",password);


    const user = await User.findOne({email});

    if(!user){
        return res.status(404).json({message:"User not found"});
    }

    const isValid = await bcrypt.compare(password, user.password);


    if(isValid){
        return res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
            }
        });
    }else{
        return res.status(401).json({message:"Invalid credentials"});
    }   

    }catch(error){
        return res.status(500).json({message:"Internal server error"});
    }

});

module.exports = router;
