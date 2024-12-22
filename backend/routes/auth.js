const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();


router.post('/',async(req,res)=>{
    try{
        console.log('Received login request:', req.body);

        // التحقق من وجود البريد الإلكتروني وكلمة المرور
        if(!req.body.email || !req.body.password){
            console.log('Missing email or password');
            return res.status(400).json({message:"البريد الإلكتروني وكلمة المرور مطلوبان"});
        }

        const {email,password} = req.body;

        // التحقق من صحة تنسيق البريد الإلكتروني
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('Invalid email format');
            return res.status(400).json({message: "تنسيق البريد الإلكتروني غير صحيح"});
        }

        const user = await User.findOne({email});
        console.log('Found user:', user ? 'Yes' : 'No');

        // التحقق من وجود المستخدم
        if (!user) {
            return res.status(401).json({message: "email or password is incorrect"});
        }

        // التحقق من صحة كلمة المرور
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({message: "email or password is incorrect"});
        }

        // إنشاء جلسة للمستخدم أو توكن JWT هنا
        return res.status(200).json({
            message: "login success",
            user: {
                id: user._id,
                email: user.email
                // يمكن إضافة المزيد من البيانات حسب الحاجة
            }
        });

    }catch(error){
        console.error('Login error details:', error);
        return res.status(500).json({message: "حدث خطأ في الخادم"});
    }
        });


module.exports = router;