var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    // username: {
    //   type: 'string'

    // },
    firstname: {
      type: 'string'

    },
    lastname: {
      type: 'string'

    },
    email: {
      type: 'string'

    },
    password: {
      type: 'string'

    },
    number: {
      type: 'number'
    }
  },

  beforeCreate: function (value, result) {

    // if(!values.password || !values.confirmation || values.password != values.confirmation) {
    //   return cb({err: ["Password does not match confirmation"]});
    // }
    value.password=bcrypt.hashSync(value.password, 10);
    result();

  }
}
