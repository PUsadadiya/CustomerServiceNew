/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcrypt');
module.exports = {

  check: function (req, res) {
    //console.log(req.user);
    return res.json(req.register.email);
  },
  login: function (req, res) {
    debugger;
    // Get password and username from request
    var email = req.param('email');
    console.log(email);
    var password = req.param('password');
    console.log(password);
    // No username/password entered
    if (!(email && password)) {
      return res.send('No email or password specified!', 500);
    }

    Register.findOne({
      email: email
    }).exec(function (err, user) {
      console.log(email);
      // Account not found
      if (err || !user) {
        return res.send('Invalid email and password combination!', 500);
      }
      console.log(err);
      console.log(user);
      var isMatched = bcrypt.compareSync(password, user.password);
      if (isMatched) {
        // return res.send('done!!');
        return res.json({
          email: email,

          token: jwToken.sign({
            id: user.id
          }, process.env.APP_SECRET),
        });
      } else {
        return res.send('Invalid  combination!', 500);
      }

      // bcrypt.compare(password,user.password, function (err, valid) {
      //   if (err || !valid) {
      //     return res.send('Invalid email and password combination!', 500);
      //     //
      //   }
      //   // else
      //   //  {
      //   // return res.json({
      //   //   email:email,
      //   //   //token: jwToken.sign(user)
      //   // //  token: jwToken.sign({ id: user.id }, process.env.APP_SECRET),
      //   // });
      //
      //   return res.send("done");
      // // console.log(res);
      //   // }
      // });
    });
  },
};
