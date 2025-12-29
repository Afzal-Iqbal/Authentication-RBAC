const express = require('express')
const verifyToken = require("../middlewares/authMiddleware")
const authorizeRoles = require("../middlewares/roleMiddleware")
const router = express.Router();

//Only admin can access this router
router.get("/admin", verifyToken,authorizeRoles("admin","manager","user"), (req,res)=>{
    res.json({msg:"Welcome Admin"})
})

// Both admin adn manager can access this router
router.get("/manager", verifyToken,authorizeRoles("manager","user"), (req,res)=>{
    res.json({
        msg:"Welcome Manager"
    })
})
// All can access this router 
router.get("/user", verifyToken, authorizeRoles("user"), (req,res) => {
    res.json({
        msg:"Welcome User"
    })
})

module.exports = router;
