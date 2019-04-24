/**
 * BookingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let mysql = require('mysql');
// let config = require('../../config/datastores');
//  let connection = mysql.createConnection(config);
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'dev'
});
module.exports = {

  BookingStatus: function (req, res, next) {
    connection.connect(function (err) {
      if (!err) {
        console.log("Database is connected ... !!!");
      } else {
        console.log("Error connecting database ... !!!");
      }
    });
    connection.query('CALL BookingStatus', function (err, rows, fields) {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send(rows);
    });
    connection.end();
  },
};

