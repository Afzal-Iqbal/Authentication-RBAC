const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken') // on successful token we give token to them 

const User = require("../models/userModel")
const register = async(req, res) => {

    try {
        
        const {username,password, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User({username, password:hashedPassword,role})
        await newUser.save();
        res.status(201).json({
            message:`user registered with user name ${username}`
        })
    } catch (error) {
         res.status(500).json({
            message:`Something went wrong ${error}`
        })
    }

}

const login = async(req , res) =>{
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({
                msg:`User with UserName ${username} not found`
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
        {
            return res.status(400).json({msg:
                `Invalid credentials `
            })
        }
        const token = jwt.sign(
            {
                id:user._id,
                role:user.role,
            },
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        )
        res.status(200).json({token});

    } catch (error) {
        res.status(500).json({
            message:`Something went wrong ${error}`
        })
    }

}

module.exports = {
    register,
    login,
}