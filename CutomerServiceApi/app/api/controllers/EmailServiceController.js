/**
 * EmailServiceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const nodemailer = require("nodemailer");
// const jwtToken = require('../services/jwToken');
// let mysql = require('sails-mysql');
// let config = require('../../config/datastores');
let transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: "jrvaghela72@zoho.com",
    pass: "Sample@123"
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
});
module.exports = {
  VerifyEmail: function (req, res) {
    var email = req.param('email');
    if (!email) {
      return res.send('No Email Or Password Specified!!!', 500);
    }
    Register.findOne({
      email: email
    }).exec(function (err, user) {
      if (err || !user) {
        return res.send('Invalid Email !!!', 500);
      }
      if (user) {
        return res.json({
          email: email,
          token: jwToken.sign({
          id: user.id
          }, process.env.APP_SECRET),
        });
      } else {
        return res.send('Invalid  Combination!!!', 500);
      }
     });
  },
  SendOtp:async function (req, res) {
    debugger;
    try {
      let info =await transporter.sendMail({
        from: 'jrvaghela72@zoho.com', // sender address
        to: "jrvaghela72@gmail.com", // list of receivers "jrvaghela72@gmail.com"
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>" // html body
      });
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.log(error);
    }
  },
 verifyOtp: function (req, res) {
    if (req.headers && req.headers.authorization) {
      var token = req.headers.authorization;
      jwtToken.verify(token, function (err, decoded) {
        if (decoded) {
          req.body.userid = decoded.data.id;
        } else {
          console.log("Error");
        }
      })
    }
  }
};
