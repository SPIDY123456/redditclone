const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return res.status(404).json({message:'No Authorization no Token'});
    }
    try {
        token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if(!req.user){
            return res.status(404).json({message :"User not found"});
        }
        next();
    }
    catch(error){
       console.error(`Error in authentication ${error.message}`);
       return res.status(401).json({message: 'No authorization Token failed'});
    }
}

module.exports = {protect}