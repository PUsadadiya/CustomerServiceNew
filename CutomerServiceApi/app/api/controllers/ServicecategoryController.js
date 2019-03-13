/**
 * ServicecategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  addcategory: function (req, res) {
    console.log(req.body);
    Servicecategory.create(req.body).then(function (err, newcategory) {
      if (err) {
        return res.ok("no category added!!");
      } else {
        //console.log("User created: " + JSON.stringify(newUser));
        console.log(newcategory);

        return res.ok("category added!");
        //  return JSON.stringify(newUser);
      }
    });
  },
  category: function (req, res) {

    console.log();
    return Servicecategory.find().then(function (_user) {

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
    return Servicecategory.find().where({
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
  subcategory: function (req, res) {

    var sid = req.param('id');
    console.log(sid);
    return Servicecategory.find().where({
      sid: sid
    }).then(function (_service) {

      if (_service && _service.length > 0) {
        console.log("Inside find Found .... _user = " + JSON.stringify(_service));
        return res.ok(_service);
        // return res.json(_service);
      } else {
        console.log("Inside find NOT Found .... ");
        return res.serverError('user not found');
      }
    }).catch(function (err) {
      console.log("Inside find ERROR .... ");
      return res.serverError('user not found');
    });
  },
  delete: function (req, res) {

    Servicecategory.destroy({
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
    var category = req.body;
    debugger;
    Servicecategory.update({
      id: category.id
    }).set({
      sid:category.sid,
      image: category.image,

      category: category.category
    }).exec(function (err, updatedUser) {
      if (err) {
        return res.negotiate(err);
      } else {
        return res.ok('updated');

      }
    });
}
}
