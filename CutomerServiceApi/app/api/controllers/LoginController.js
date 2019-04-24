/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcrypt');
module.exports = {
  login: function (req, res) {
    var email = req.param('email');
    var password = req.param('password');
    if (!(email && password)) {
      return res.send('No Email Or Password Specified!!!', 500);
    }
    Register.findOne({
      email: email
    }).exec(function (err, user) {
      if (err || !user) {
        return res.send('Invalid Email And Password Combination!!!', 500);
      }
      var isMatched = bcrypt.compareSync(password, user.password);
      if (isMatched) {
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
};
