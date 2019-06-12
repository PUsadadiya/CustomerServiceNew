/**
 * ForgotPassword.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    createdAt: { type: 'ref', columnType: 'timestamp', autoCreatedAt: true, },
    updatedAt: { type: 'ref', columnType: 'timestamp', autoUpdatedAt: true, },
    mobile: {
      type:'number',
     required: true
    },
    token:{
      type:'string',
       required: true
    },
    // OTP:{
    //   type:'number',
    //   required: false
    // }
    // generatedDate:{
    //   type:'string',
    //   columnType: 'datetime',
    //   required:false
    // },
    status:{
      type:'number',
      defaultsTo:0
    }
  },

}
