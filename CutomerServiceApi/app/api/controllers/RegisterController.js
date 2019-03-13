// var bcrypt = require('bcrypt');

module.exports = {

  create: function (req, res) {
    Register.create(req.body).then(function (err, newUser) {
      if (err) {
        return res.ok("no user created!!");
      } else {
        //console.log("User created: " + JSON.stringify(newUser));
        console.log(newUser);
        return res.ok("user created!");
      }
    });
  },

  findAll: function (req, res) {

    console.log();
    return Register.find().then(function (_user) {

      if (_user && _user.length > 0) {
        console.log("Inside find Found .... _user = " + JSON.stringify(_user));
        return res.ok(_user);
      } else {
        console.log("Inside find NOT Found .... ");
        return res.notfound('user not found');
      }
    }).catch(function (err) {
      console.log("Inside find ERROR .... ");
      return res.serverError('user not found');
    });
  },
  findById: function (req, res) {
    var id = req.param('id');
    console.log(id);
    return Register.find().where({
      id: id
    }).then(function (_user) {
      if (_user && _user.length > 0) {
        console.log("Inside find Found .... _user = " + JSON.stringify(_user));
        return res.ok(_user[0]);
      } else {
        console.log("Inside find NOT Found .... ");
        return res.notfound('user not found');
      }
    }).catch(function (err) {
      console.log("Inside find ERROR .... ");
      return res.serverError('user not found');
    });
  },
  delete: function (req, res) {
    Register.destroy({
      id: req.param("id")
    }).exec(function (err, _user) {
      if (_user && _user.length > 0) {
        console.log("Inside find Found .... _user = " + JSON.stringify(_user));
        res.ok("record removed");

      } else {
        res.json({
          err: err
        })
      }
    });
  },
  update: function (req, res) {
    Register.findOne({
      id: req.param('id')
    }, function foundUser(err, user) {
      if (err) {
        return res.negotiate(err);
      } else {
        Register.update({
          id: req.param("id")
        }, {
          // username: req.param("username"),
          firstname: req.param("firstname"),
          lastname: req.param("lastname"),
          email: req.param("email"),
          password: req.param("password"),
          number: req.param("number")

        }).exec(function (err, updatedUser) {
          if (err) {
            return res.negotiate(err);
          } else {
            return res.ok("record is updated");
          }
        });
      }
    });
  },

}
