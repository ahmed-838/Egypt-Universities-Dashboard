const bcrypt = require('bcrypt');
const User = require('../models/User');

// دالة لتشفير كلمة المرور
const hashPassword = async (password) => {
    try {
        console.log("Password to hash:", password);
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error; // إعادة الخطأ للتعامل معه في مكان آخر
    }
};

// createUser("loay@admin.com", "1111@A2222");
// دالة لإنشاء مستخدم جديد
const createUser = async (email, plainPassword) => {
    try {
        // تشفير كلمة المرور
        const hashedPassword = await hashPassword(plainPassword);

        // إنشاء المستخدم وحفظه في قاعدة البيانات
        const user = new User({
            email,
            password: hashedPassword,
        });
        await user.save();

        console.log("User created successfully:", user);
        return user;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; // إعادة الخطأ للتعامل معه في مكان آخر
    }
};

module.exports = createUser;
