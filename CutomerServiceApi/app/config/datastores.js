require('sails-mysql');

module.exports.datastores = {
  default: {
     adapter: 'sails-mysql',
     url: 'mysql://root:password@localhost:3306/dev',
  },

};
// let connection = mysql.createConnection();
//  let connection = createConnection(config);
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'dev'
// });



