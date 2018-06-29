const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {  
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_KEY);
        //console.log(token)
        //req.userData = { email: decodedToken.email, userId: decodedToken.userID };
        //console.log(req.userData)
        next();
    }   
    catch(error) {
        console.log(error)
        res.status(401).json({message: "Auth failed in check-auth"})
    }
    
};