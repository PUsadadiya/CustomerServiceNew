/**
 * ServicecategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  addservice: function (req, res) {
    var fileName = req.body.service + '.jpg';
    req.file('image').upload({
      maxBytes: 100000000,
      saveAs: __dirname + '/../../assets/img/services/' + fileName
    }, function (err, uploadedFile) {
      if (err) return res.negotiate(err);
      req.body.image ='http://192.168.32.75:1337/img/services/' + fileName;
      req.body.type=uploadedFile[0].type;
      req.body.size=uploadedFile[0].size;
      Service.create(req.body).then(function (err, newservice) {
        if (err) {
          return res.ok("No servie Added!!");
        } else {
          return res.ok("Service Added!");
        }
      }).catch(function (err) {
        return res.status(404).send({
          message: "BAD_REQUEST"
        });
      });
    });
  },
  service: function (req, res) {
    return Service.find().then(function (_service) {
      if (_service && _service.length > 0) {
        return res.ok(_service);
      } else {
        return res.notfound('Service Not Found');
      }
    }).catch(function (err) {
      return res.serverError('Service Not Found');
    });
  },
  findById: function (req, res) {
    var id = req.param('id');
    return Service.find().where({
      id: id
    }).then(function (_service) {
      if (_service && _service.length > 0) {
        return res.ok(_service[0]);
      } else {
        return res.notfound('Service Not Found');
      }
    }).catch(function (err) {
      return res.serverError('Service Not Found');
    });
  },
  subservice: function (req, res) {
    category.findOne({
      id: req.param('id')
    }).exec(function (err, category) {
      var cid = category.id;
      return Service.find().where({
        cid: cid
      }).then(function (_service) {
        if (_service && _service.length > 0) {
          return res.ok(_service);
        } else {
          return res.serverError('Service Not Found');
        }
      }).catch(function (err) {
        return res.serverError('Service Not Found');
      });
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
      res.json('Service Removed!!!');
    })
  },
  update: function (req, res) {
    var service = req.body;
    Service.update({
      id: service.id
    }).set({
      cid: service.cid,
      type: service.type,
      size:service.size,
      service: service.service,
      price:service.price
    }).exec(function (err, updatedservice) {
      if (err) {
        return res.negotiate(err);
      } else {
        return res.ok('Service Updated!!!');
      }
    });
  }
};
