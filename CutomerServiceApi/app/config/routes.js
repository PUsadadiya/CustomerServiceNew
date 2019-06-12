module.exports.routes = {

  '/': {
    view: 'pages/homepage'
  },
  //***********************************REGISTER********************************************** */
  'post /register/create': {
    controller: 'register',
    action: "create",
  },
  'post /login/login': {
    controller: 'login',
    action: "login",
  },

  'get /register/findall': {
    controller: 'register',
    action: "findall",
  },
  'get /register/:id': {
    controller: 'register',
    action: "findById",
  },
  'delete /delete/register': {
    controller: 'register',
    action: "delete",
  },
  'put /register/update': {
    controller: 'register',
    action: "update",
  },
  'get /service/findall': {
    controller: 'service',
    action: "findall",
  },
  //**************************************CATEGORYE********************************************* */
  'post /category/addcategory': {
    controller: 'category',
    action: "addcategory",
  },
  'get /category/view': {
    controller: 'category',
    action: "view",
  },
  'get /category/:id': {
    controller: 'category',
    action: "findById",
  },
  'delete /category/:id': {
    controller: 'category',
    action: "delete",
  },
  'put /category/update/': {
    controller: 'category',
    action: "update",
  },
  //***********************************SERVICE******************************************** */
  'post /service/addservice': {
    controller: 'service',
    action: "addservice",
  },
  'get /service/service': {
    controller: 'service',
    action: 'service',
  },
  'get /Service/getAllservice': {
    controller: 'service',
    action: 'getAllservice',
  },
  'get /Service/getserviceById': {
    controller: 'service',
    action: 'getserviceById',
  },
  'get /Service/subservice/:id': {
    controller: 'service',
    action: 'subservice',
  },
  'delete /Service/:id': {
    controller: 'service',
    action: 'delete',
  },
  'put  /Service/update/': {
    controller: 'service',
    action: 'update',
  },
  //*************************************ORDERSERVISE********************************************** */
  'post /OrderService/PlaceOrder': {
    controller: 'OrderService',
    action: 'PlaceOrder',
  },
  'get /OrderService/OrderList': {
    controller: 'OrderService',
    action: 'OrderList',
  },
  'get /OrderService/findbyid': {
    controller: 'OrderService',
    action: 'findById',
  },
  'post /OrderService/:id': {
    controller: 'OrderService',
    action: 'findById',
  },
  'post /OrderService/address': {
    controller: 'OrderService',
    action: 'address',
  },
  'put  /OrderService/update/': {
    controller: 'OrderService',
    action: 'update',
  },
  //*************************************BOOKINGSTATUS********************************************** */
  'get /Booking/BookingStatus': {
    controller:'Booking',
    action: 'BookingStatus',
  },
  //*************************************IMAGE********************************************** */
  'GET /img/categories' :{
    view: 'categories'
  },
   'GET /img/services' :{
     view: 'services'
    },
  //*************************************IMAGE********************************************** */
  'post /ForgotPassword/SendOTP': {
    controller: 'ForgotPassword',
    action: 'SendOTP',
  },
  'put /ForgotPassword/update': {
    controller: 'ForgotPassword',
    action: "update",
  },
  'post /ForgotPassword/VerifyOTP': {
    controller: 'ForgotPassword',
    action: 'VerifyOTP',
  },
  'post /ForgotPassword/ResendOTP': {
    controller: 'ForgotPassword',
    action: 'ResendOTP',
  },
  'post /SmsService/SendOTP': {
    controller: 'SmsService',
    action: 'SendOTP',
  },
  'post /SmsService/VerifyOTP': {
    controller: 'SmsService',
    action: 'VerifyOTP',
  },
  'post /SmsService/ResendOTP': {
    controller: 'SmsService',
    action: 'ResendOTP',
  },

};
