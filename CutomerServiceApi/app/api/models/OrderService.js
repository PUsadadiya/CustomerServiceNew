/**
 * OrderService.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id: {
      type: 'integer',
      autoIncrement: true,
      // primaryKey: true
   },
    userid: {
      type: 'number',
      required: true
    },
    categoryid: {
      type: 'number',
      required: true
    },
    serviceid: {
      type: 'number',
      required: true
    },
    addressid:{
      type:'number',
      required:true
    },
    category_name:{
      type:'string',
      required:true
    },
    service_name:{
      type:'string',
      required:true
    },
    username: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true
    },
    mobile: {
      type: 'number',
      required: true
    },
    start_date: {
      type: 'string',
      columnType: 'date',
      required: true
    },
    start_time: {
      type: 'string',
      columnType: 'time',
      required: true
    },
    end_date: {
      type: 'string',
      columnType: 'date',
      required: true
    },
    totalamount:{
      type:'number',
      required:true
    },
    orderstatus:{
       type:'number',
       defaultsTo:-1
    }

  }
};
