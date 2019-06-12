/**
 * ForgotPasswordController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const SendOtp = require('sendotp');
// const sendOtp = new SendOtp('139876AqGy83kNU58931e6e');
const sendOtp = new SendOtp('279589AdMrj5balVcE5cf60c18');
var bcrypt = require('bcrypt');
const jwtToken = require('../services/jwToken');
module.exports = {
  SendOTP: function (req, res) {
    const mobile = +req.param('mobile');
    Register.findOne({
      mobile: mobile
    }).exec(function (err, user) {
      var data = {
        mobile: mobile,
        token: jwToken.sign({
          id: user.id
        }, process.env.APP_SECRET),
      }
      res.send(data);
      ForgotPassword.create(data).then(function (err, newUser) {
        if (err) {
          return res.status(404).send({
            message: "BAD_REQUEST"
          });
        } else {
          return res.send(newUser);
        }
      })
      sendOtp.send(mobile, "PRIIND", function (error, data) {
        if (error) {
          return res.ok("Error");
        } else {
          return res.ok(data);
        }
      })
      sendOtp.setOtpExpiry('10');
    });
  },
  VerifyOTP: function (req, res) {
    var mobile = req.param('mobile');
    var OTP = req.param('OTP');
    sendOtp.verify(mobile, OTP, function (error, data) {
      if (data.type == 'success') {
        return res.json({
          status: 'OTP verified successfully',
          is_success: true
        });
      } else {
        return res.json({
          status: 'OTP verification failed ',
          is_success: false
        });
      }
    });
  },
  ResendOTP: function (req, res) {
    var mobile = req.param('mobile');
    sendOtp.retry(mobile, false, function (error, data) {
      if (error) {
        return res.json({
          status: 'OTP verification failed '
        });
      } else {
        return res.json({
          status: 'OTP verified successfully'
        });
      }
    });
  },
  update: function (req, res) {
    if (req.headers && req.headers.authorization) {
      var token = req.headers.authorization;
      jwtToken.verify(token, function (err, decoded) {
        if (decoded) {
          req.body.id = decoded.data.id;
        } else {
          console.log("Error");
        }
      })
      var password = req.param('password');
      Register.update({
        id: req.body.id
      }).set({
        password: bcrypt.hashSync(password, 10)
      }).exec(function (err, updatePassword) {
        if (err) {
          return res.json({
            status: 'Error'
          });
        } else {
          return res.json({
            status: 'Password Updated'
          });
        }
      });
    }
  }
};
