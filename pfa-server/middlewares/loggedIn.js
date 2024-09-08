const User = require('../models/User');
const Card = require('../models/Card');
const jwt = require('jsonwebtoken');
const jwtSecret = 'amira_web';

const isLoggedIn = async(req, res, next)=>{
    const token = req.headers['token'];
    if (token) {
        jwt.verify(token, jwtSecret, async (err, authUser) => {
            if (err) {
                return res.json({
                    success: false,
                    message: "Invalid token."
                })
            }
            if (authUser.id == req.headers['userid']) {
                const user = await User.findOne({ _id: authUser.id });
                if (user.token && user.token != token) {
                    return res.json({
                        success: false,
                        message: "Invalid token."
                    })
                }
                next();
            }else{
                console.log('8alet')
            }
        })
    } else {
        res.json({
            success: false,
            message: "Rak makch mconnecty"
        })
    }
}

module.exports = {isLoggedIn};