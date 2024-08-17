const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller.js');
const { checkProfileImageFileTypeMiddleware } = require('../middlewares/checkProfileImageFileTypeMiddleware');

router.route('/signup')
    .post(checkProfileImageFileTypeMiddleware , userController.signup);
    
router.post('/visitorsignup',userController.visitorSignup);

// router.post('/designersignup',userController.designerSignup);
router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.post('/resetpassword',userController.resetPassword);

router.post('/verificationcode/:token',userController.verificationCode);

router.post('/changepassword/:token',userController.changePassword);

router.post('/googlesignup',userController.googleAuth);


module.exports = router;