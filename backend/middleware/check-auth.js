const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {  
    try {
        
        const token = req.headers.authorization.split(" ")[1];        
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        //console.log(decodedToken)
        req.userData = {email: decodedToken.email, userId: decodedToken.userID}
        //console.log(req.userData.email)
        next();
    }   
    catch(error) {
        console.log(error)
        res.status(401).json({message: "Auth failed in check-auth"})
    }
    
};