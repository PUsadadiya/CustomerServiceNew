/**
 * OrderServiceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const jwtToken = require('../services/jwToken');
let mysql = require('sails-mysql');
let config = require('../../config/datastores');
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
        var service = {
          userid: req.body.userid,
          username: user.firstname,
          email: user.email,
          mobile: user.mobile,
          start_date: req.body.start_date,
          start_time: req.body.start_time,
          end_date: req.body.end_date,
          categoryid: req.body.categoryid,
          serviceid: req.body.serviceid,
          totalamount: req.body.totalamount,
          category_name: req.body.category_name,
          service_name: req.body.service_name,
          addressid: req.body.addressid
        }
        OrderService.create(service).then(function (err, order) {
          if (err) {
            return res.ok("Order Rejected!!!");
          } else {
            return res.ok("Order Accepted!!!");
          }
        }).catch(function (err) {
          return res.serverError(' No Order Place!!!');
        })
      });
    }
  },
  OrderList: function (req, res) {
    Register.query('CALL getall_Orderaddress()', function (err, result, field) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result.rows[0]);
      }
    });
  },
  findById: function (req, res) {
    if (req.headers && req.headers.authorization) {
      var token = req.headers.authorization;
      var user_id = 0;
      jwtToken.verify(token, function (err, decoded) {
        if (decoded) {
          user_id = decoded.data.id;
        } else {
          console.log("Error");
        }
      })
      OrderAddress.find().where({
        userid: user_id
      }).then(function (_order) {
        if (_order && _order.length > 0) {
          res.send(_order);
        } else {
          return res.serverError('No Order Found');
        }
      }).catch(function (err) {
        return res.serverError(err);
      });
    }
  },
  update: function (req, res) {
    var order = req.body;

    OrderService.update({
      id: order.id
    }).set({
      orderstatus: order.orderstatus
    }).exec(function (err, updatedOrder) {
      if (err) {
        return res.negotiate(err);
      } else {
        return res.ok('Order Updated');
      }
    });
  },
  address: function (req, res) {
    if (req.headers && req.headers.authorization) {
      var token = req.headers.authorization;
      jwtToken.verify(token, function (err, decoded) {
        if (decoded) {
          req.body.userid = decoded.data.id;
        } else {
          console.log("Error");
        }
      })
      var userid = req.body.userid;
      var OrderAddress = req.body.location;
      Register.query('CALL OrderAddress("' + userid + '","' + OrderAddress + '")', function (err, rows, field) {
        if (err) {
          res.status(400).send(err);
        } else {
          var addressId = rows.rows[0][0].OrderId;
          res.json(200, {
            addressId: addressId
          });
        }
      });
    }
  }
};
