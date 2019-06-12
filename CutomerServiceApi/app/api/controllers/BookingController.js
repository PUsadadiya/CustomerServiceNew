/**
 * BookingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const jwtToken = require('../services/jwToken');
let mysql = require('sails-mysql');
let config = require('../../config/datastores');
module.exports = {

  BookingStatus: function (req, res) {
    if (req.headers && req.headers.authorization) {
      var token = req.headers.authorization;
      jwtToken.verify(token, function (err, decoded) {
        if (decoded) {
          var userid = decoded.data.id;
          Register.query('CALL BookingStatus(' + userid + ')', function (err, rows) {
            if (err) {
              res.status(400).send(err);
            } else {
              res.status(200).send(rows.rows[0]);
            }
          });
        } else {
          console.log("Error1");
        }
      });
    }
  },
};
