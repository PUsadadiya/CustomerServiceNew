/**
 * OrderService.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    userid: {
      type: 'number'
    },
    categoryid: {
      type: 'number'
    },
    serviceid: {
      type: 'number'
    },
    username: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    mobile: {
      type: 'number'
    },
    location: {
      type: 'string'
    },
    start_date: {
      type: 'string',
      columnType: 'date'
    },
    start_time: {
      type: 'string',
      columnType: 'time'
    },
    end_date: {
      type: 'string',
      columnType: 'date'
    },
    OrderStatus:{
       type:'number',
       defaultsTo:-1
    }
  }
};
