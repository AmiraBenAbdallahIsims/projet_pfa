const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller.js');
const { checkProfileImageFileTypeMiddleware } = require('../middlewares/checkProfileImageFileTypeMiddleware');

router.route('/signup')
      .post(checkProfileImageFileTypeMiddleware , userController.signup);

router.post('/googlesignup',userController.googleAuth);  

router.post('/login', userController.login);

router.post('/resetpassword',userController.resetPassword);

router.post('/verificationcode/:token',userController.verificationCode);

router.post('/changepassword/:token',userController.changePassword);

router.get('/logout', userController.logout);






module.exports = router;