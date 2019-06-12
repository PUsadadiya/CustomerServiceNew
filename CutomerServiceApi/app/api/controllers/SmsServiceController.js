/**
 * SmsServiceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const SendOtp = require('sendotp');
const sendOtp = new SendOtp('139876AqGy83kNU58931e6e');

module.exports = {
  SendOTPp: function (req, res) {
    const mobile = req.param('mobile');
    Register.findOne({
      mobile:mobile
    }).exec(function (err, user) {
      if (err || !user) {
        return res.send('Invalid Email !!!', 500);
      }
      if (user) {
        return res.json({
          mobile: mobile,
          token: jwToken.sign({
          id: user.id
          }, process.env.APP_SECRET),
        });
      } else {
        return res.send('Invalid  Combination!!!', 500);
      }
     })
    sendOtp.send(mobile, "PRIIND", function (error, data) {
      if (error) {
        // console.log(error);
        return res.ok("Error");

      }else{
         return res.ok(data);
      }
    });
  },
  VerifyOTP: function (req, res) {
    var mobile = req.param('mobile');
    var otp = req.param('otp');
    // var token = req.param('token');
    sendOtp.verify(mobile, otp, function (error, data) {
      if (data.type == 'success') {
        return res.ok('OTP verified successfully');
      }
      if (data.type == 'error') {
        return res.ok('OTP verification failed');
      }
    });
  },
  ResendOTP: function (req, res) {
    var mobile = req.param('mobile');
    sendOtp.retry(mobile, false, function (error, data) {
      if (error) {
        return res.ok(error);

      } else {
        return res.ok(data);
      }
    });
  },
};
//******************************************************************************* */
// const SendOtp = require('sendotp');
// //const sendOtp = new SendOtp('278562A1vmJcjq5cec1061');
// const sendOtp = new SendOtp('139876AqGy83kNU58931e6e');

// sendOtp.send('7203073567', "PRIIND", function(error, data){
//  if(error){
//  console.log(error);
//  return;
//  }
//  console.log(data);
// });
//***************************************************************** */
// const accountSid = 'ACca94b512b2f66ce1aafa361219791c24';
// const authToken = '4db395f6cb95dad5a1bbaa28a01619d6';
// const client = require('twilio')(accountSid, authToken);
// client.messages
//   .create({
//     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//     from: '+14242963276',
//     to: '+917203073567'
//   })
//   .then(message => console.log(message.sid));
