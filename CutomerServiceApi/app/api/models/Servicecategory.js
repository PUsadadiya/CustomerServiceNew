/**
 * Servicecategory.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    sid:{
      type:'number'
    },
    image:
    {
      type:'string'
    },
    category: {
      type: 'string'
    }
  },

};

