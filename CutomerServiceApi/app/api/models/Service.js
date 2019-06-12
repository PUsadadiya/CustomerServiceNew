/**
 * Servicecategory.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    cid: {
      type: 'number'
    },
    image: {
      type: 'string'
    },
    service: {
      type: 'string'
    },
    price:
    {
        type:'number'
    },
    type:{
      type:'string'
    },
    size:
    {
      type:'number'
    }
  },

};
