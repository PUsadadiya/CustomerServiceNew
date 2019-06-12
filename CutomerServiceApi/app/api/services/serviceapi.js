module.exports = {

  categorylist: function (req, res) {

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
  subcategory: function (req, res) {
    var sid = req.params('id');
    console.log(id);
    return Servicecategory.find().where({
      sid: sid
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
  }
};
