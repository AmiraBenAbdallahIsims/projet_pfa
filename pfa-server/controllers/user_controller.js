const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const jwtSecret = 'amira_web';
var randomstring = require("randomstring");
const nodemailer = require("nodemailer");


exports.signup = async (req, res) => {

  console.log("this is the body :", req.body)
  const user = await User.findOne({ '$or': [{ username: req.body.username }, { email: req.body.email }] });

  console.log(req.file);

  if (user) {

    return res.json({
      success: false,
      message: "Username or email already exist."
    })
  }
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    image : req.file.path
  });

  await newUser.save();

  res.json({
    success: true
  });


}



exports.googleAuth = async(req, res)=>{
  const credits = jwt.decode(req.body.credits);
  console.log("those are the credits : ",credits);

  const user = await User.findOne({ '$or': [{ username: credits.name }, { email: credits.email }] });


    if (user) {

      return res.json({
        success: false,
        message: "Username or email already exists."
      })
    }
    const newUser = new User({
      username: credits.name,
      email: credits.email,
      role: 'client',
      image : credits.picture,
      sub : credits.sub

    });

    await newUser.save();

    res.json({
      success: true
    });
}


exports.login = async (req, res) => {
  try {
    let email = req.body.email;
    let sub = "";
    let password = req.body.password;
    if(req.headers['google']){
      const credits = jwt.decode(req.body.credits);
      email = credits.email;
      sub = credits.sub;
    }

    const user = await User.findOne({ email: email });
    if (user) {
      if(user.password && user.password !="" &&  sub !=""){
        return res.json({
          success : false,
          message : "The email do not exist as a google account. Connect with normal form"
        })
      }
      if(user.sub && user.sub !="" && password){
        return res.json({
          success : false,
          message : "This email already assosciated with a google account.Try to connect with google"
        })
      }
      if (sub != "" || req.body.password == user.password ) {
        const token = jwt.sign({ id: user._id }, jwtSecret);
        user.token = token;
        await user.save();

        return res.json({
          token : user.token,
          success: true,
          user: user,
          image : user.image
        });
      } else {
        return res.json({
          success: false,
          message: 'Incorrect password.',
        });
      }
    } else {
      console.log(`User not found for email: ${req.body.email}`);
      return res.json({
        success: false,
        message: 'User not found.',
      });
    }
  } catch (error) {
    console.error(`Error during login: ${error}`);
    return res.status(500).json({
      success: false,
      message: 'Error logging in.',
    });
  }
};
exports.resetPassword = async (req, res) => {
  try {

    const resetCode = randomstring.generate(8);
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    const resetToken = randomstring.generate(16);

    if (user) {
      user.resetcode = resetCode;
      user.resetToken = resetToken;
      await user.save();

      let smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'mahdi.mahdi12345678903@gmail.com',
          pass: 'sgzqtlpgvinigkbc'
        }
      });

      const info = await smtpTransport.sendMail({
        from: 'LinkUp Support <no-reply@linktree.com>',
        to: email,
        subject: "Password Reset",
        text: "Here is your account resetting password",
        html: `<b>${resetCode}</b>`,
      });
      res.json({
        success: true,
        token: resetToken
      })
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
}
exports.verificationCode = async (req, res) => {
  const code = req.body.verificationcode;
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  const token = req.params.token;


  if (user) {
    if (token == user.resetToken) {
      if (user.resetCode == code) {
        res.json({
          success: true,
        })
      } else {
        res.json({
          success: false,
          message: "The verification code is incorrect"
        })
      }
    } else {
      res.json({
        success: false,
        message: "Invalid token."
      })
    }
  } else {
    res.json({
      success: false,
      message: "User does not exist"
    })
  }
}

exports.changePassword = async (req, res) => {
  const email = req.body.email;
  const newpassword = req.body.newpassword;
  const newpasswordcheck = req.body.newpasswordcheck
  const user = await User.findOne({ email: email });
  const token = req.params.token;
  if (user) {
    if (token == user.resetToken) {
      if (newpassword == newpasswordcheck) {
        user.password = newpassword;
        await user.save();
        res.json({
          success: true
        })
      }
      else {
        res.json({
          success: false,
          message: "check again!"
        })
      }
    } else {
      res.json({
        success: false,
        message: "Invalid Token."
      })
    }
  } else {
    res.json({
      success: false,
      message: "User does not exist"
    })
  }
}

exports.logout = async (req, res) => {
  const token = req.headers['token'];
  if (token) {
    console.log("this is token : ", token)
    jwt.verify(token, jwtSecret, async (err, authUser) => {
      if (err) {
        return res.json({
          success: false,
          message: "Invalid token."
        })
      }
      console.log("this is the authuser : " , authUser)
      if (authUser.id == req.headers['userid']) {
        const user = await User.findOne({ _id: authUser.id });
        if (user.token && user.token != token) {
          return res.json({
            success: false,
            message: "Invalid token."
          })
        }
        
        user.token = null;
        await user.save();
        res.json({ success: true, message: 'Logged out successfully.' });
      }
    })
  }else{
    res.json({
      success : false,
      message : "Rak makch mconnecty"
    })
  }
}

