// roleMiddleware.js
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        console.log("User Role from Token:", req.user.role); // Debug line
        console.log("Allowed Roles for this route:", allowedRoles);

        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                msg: `Access denied. Your role (${req.user?.role}) does not have permission.`
            });
        }
        next();
    };
};

module.exports = authorizeRoles;