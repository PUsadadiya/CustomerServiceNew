var bcrypt = require('bcrypt');

module.exports = {
  attributes: {

    firstname: {
      type: 'string',
      required: true
    },
    lastname: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      isEmail: true,
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    mobile: {
      type: 'number',
      required: true
    }
  },
  beforeCreate: function (value, result) {
    // if(!values.password || !values.confirmation || values.password != values.confirmation) {
    //   return cb({err: ["Password does not match confirmation"]});
    // }
    value.password = bcrypt.hashSync(value.password, 10);
    result();
  }
}
