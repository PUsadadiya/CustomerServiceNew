/**
 * OrderServiceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const jwtToken = require('../services/jwToken');
module.exports = {

  PlaceOrder: function (req, res) {
    debugger;
    if (req.headers && req.headers.authorization) {
      var token = req.headers.authorization;
      jwtToken.verify(token, function (err, decoded) {
        if (decoded) {
          req.body.userid = decoded.data.id;
        } else {
          console.log("Error");
        }
      })
      Register.findOne({
        id: req.param('userid')
      }).exec(function (err, user) {
        req.body.username = user.firstname;
        req.body.email = user.email;
        req.body.mobile = user.number;
        console.log(req.body);
        OrderService.create(req.body).then(function (err, order) {
          if (err) {
            return res.ok("Order Rejecteed!!!");
          } else {
            return res.ok("Order Accepted!!!");
          }
        }).catch(function (err) {
          return res.serverError(' No Order Found!!!');
        })
      });
    }
  },
  OrderList: function (req, res) {
    return OrderService.find().then(function (_order) {
      if (_order && _order.length > 0) {
        return res.ok(_order);
      } else {
        return res.notfound('No Order Found');
      }
    }).catch(function (err) {
      return res.serverError('No Order Found');
    });
  },
  findById: function (req, res) {
    var id = req.param('id');
    return OrderService.find().where({
      id: id
    }).then(function (_order) {
      if (_order && _order.length > 0) {
        return res.ok(_order[0]);
      } else {
        return res.notfound('No Order Found');
      }
    }).catch(function (err) {
      return res.serverError('No Order Found');
    });
  },
  delete: function (req, res) {
    OrderService.destroy({
      id: req.param("id")
    }).exec(function (err) {
      if (err) {
        res.json({
          err: err
        })
      }
      res.json('Order Removed');
    })
  },
  update: function (req, res) {
    var order = req.body;
    OrderService.update({
      id: order.id
    }).set({
      OrderStatus: order.OrderStatus
    }).exec(function (err, updatedOrder) {
      if (err) {
        return res.negotiate(err);
      } else {
        return res.ok('Order Updated');
      }
    });
  },
  Orderdetail: function (req, res) {
    //   debugger;
    //   if (req.headers && req.headers.authorization) {
    //     var token = req.headers.authorization;
    //     jwtToken.verify(token, function (err, decoded) {
    //       if (decoded) {
    //         var userid = decoded.data.id;
    //       } else {
    //         console.log("error");
    //       }
    //       console.log(userid);
    //       OrderService.find({
    //         userid: userid
    //       }).then(function (_order) {
    //         let response =[];
    //         let OrderStatus = [];
    //         let categoryid = [];
    //         let serviceid = [];
    //         for (var i = 0; i < _order.length; i++) {
    //           OrderStatus.push(_order[i].OrderStatus);
    //           categoryid.push(_order[i].categoryid);
    //           serviceid.push(_order[i].serviceid);
    //         }
    //         category.find({
    //           id: categoryid
    //         }).then(function (_category) {
    //           console.log(_category);
    //           let categoryname = [];
    //           for (var i = 0; i < _category.length; i++) {
    //             categoryname.push(_category[i].category);
    //           }
    //           // console.log(categoryname);
    //           Service.find({
    //             id: serviceid
    //           }).then(function (_service) {
    //             let servicename = [];
    //             for (var i = 0; i < _service.length; i++) {
    //               servicename.push(_service[i].service);
    //             }
    //             let details = {
    //               "OrderStatus": OrderStatus,
    //               "categoryname":categoryname,
    //               "servicename": servicename
    //             }
    //             res.json({
    //               details: details
    //             });
    //           })
    //         })

    //       })
    //     });
    //   }
  },
};
