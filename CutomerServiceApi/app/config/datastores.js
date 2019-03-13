require('sails-mysql');

module.exports.datastores = {
  default: {
     adapter: 'sails-mysql',
     url: 'mysql://root:password@localhost:3306/dev',

  }


};

