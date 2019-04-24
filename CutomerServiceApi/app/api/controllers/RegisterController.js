// var bcrypt = require('bcrypt');

module.exports = {

  create: function (req, res) {
    Register.create(req.body).then(function (err, newUser) {
      if (err) {
        return res.status(404).send({
          message: "BAD_REQUEST"
        });
      } else {
        return res.ok("User Registered Successfully!!!");
      }
    }).catch(function (err) {
      return res.status(404).send({
        message: "BAD_REQUEST"
      });
    });
  },
  findAll: function (req, res) {
    return Register.find().then(function (_user) {
      if (_user && _user.length > 0) {
        return res.ok(_user);
      } else {
        return res.notfound('User Not Found');
      }
    }).catch(function (err) {
      return res.serverError('User Not Found');
    });
  },
  findById: function (req, res) {
    var id = req.param('id');
    return Register.find().where({
      id: id
    }).then(function (_user) {
      if (_user && _user.length > 0) {
        return res.ok(_user[0]);
      } else {
        return res.notfound('User Not Found');
      }
    }).catch(function (err) {
      return res.serverError('User Not Found');
    });
  },
  delete: function (req, res) {
    Register.destroy({
      id: req.param("id")
    }).exec(function (err, _user) {
      if (_user && _user.length > 0) {
        // console.log("Inside find Found .... _user = " + JSON.stringify(_user));
        res.ok("Record Removed!!!");
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
          firstname: req.param("firstname"),
          lastname: req.param("lastname"),
          email: req.param("email"),
          password: req.param("password"),
          number: req.param("number")
        }).exec(function (err, updatedUser) {
          if (err) {
            return res.negotiate(err);
          } else {
            return res.ok("Record Updated!!!");
          }
        });
      }
    });
  },
}
