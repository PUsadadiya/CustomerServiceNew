/**
 * OrderAddress.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    userid: {
      type: 'number',
      required: true
    },
    OrderAddress: {
      type: 'string',
      required: true,
      unique: true,
      allowNull: false
    }
  },
};
