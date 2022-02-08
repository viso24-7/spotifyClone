const route = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

route.post('/register',async (req,res) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password,salt);
    const user = await new User({
        username: req.body.username,
        email:req.body.email,
        password:hash
    })
    try{
       const userSaved = await user.save();

       res.status(200).json(userSaved)
    }catch(err){
        res.status(500).json(err);
    }
})

route.post('/login',async (req,res) => {
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            res.status(404).json('User no found')
        }  

        const match = await bcrypt.compare(req.body.password,user.password);
        !match && res.status(401).json('Wrong Credentials');

        const token = jwt.sign({
            id: user._id
        },process.env.JWT_SECRET,
        {expiresIn:'3d'});

        const {password,...info} = user._doc;
        res.status(200).json({info,token})
    } catch(err){
        res.status(500).json(err);
    }
})


module.exports = route;