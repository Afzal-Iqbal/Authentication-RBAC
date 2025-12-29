const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token;
    // Fix: Express uses req.headers (lowercase)
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode; // This contains the user ID and ROLE
            console.log("The decoded user is: ", req.user);
            next();
        } catch (err) {
            return res.status(401).json({ msg: "Token is not valid." });
        }
    } else {
        // Fix: If no header is present, return unauthorized
        return res.status(401).json({ msg: "No token, authorization denied." });
    }
};

module.exports = verifyToken;