/**
 * ServiceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  addservice: function (req, res) {
    console.log(req.body);
    Service.create(req.body).then(function (err, newservice) {
      if (err) {
        return res.ok("no service added!!");
      } else {
        //console.log("User created: " + JSON.stringify(newUser));
        console.log(newservice);
        return res.ok("service added!");
        //  return JSON.stringify(newUser);
      }
    });
  },
  view: function (req, res) {

    console.log();
    return Service.find().then(function (_user) {
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
    debugger;
    var id = req.param('id');
    console.log(id);
    return Service.find().where({
      id: id
    }).then(function (_service) {
      if (_service && _service.length > 0) {
        console.log("Inside find Found .... _user = " + JSON.stringify(_service));
        return res.ok(_service[0]);
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
    Service.destroy({
      id: req.param("id")
    }).exec(function (err) {
      if (err) {
        res.json({
          err: err
        })
      }
      res.json('record removed');
    })
  },
  update: function (req, res) {
    debugger;
    var service = req.body;
    debugger;
    Service.update({
      id: service.id
    }).set({
      image: service.image,

      service: service.service
    }).exec(function (err, updatedUser) {
      if (err) {
        return res.negotiate(err);
      } else {
        return res.ok('updated');

      }
    });
  }

};
