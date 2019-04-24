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
  // 'get /login/login': {
  //   controller: 'login',
  //   action: "login",
  // },
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
  'get /register/update': {
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
  // 'get /public/images/*': {
  //   controller: 'category',
  //   action: "upload",
  // },

  'post /category/upload': {
      controller: 'category',
      action: "upload",
    },
  //***********************************SERVICE******************************************** */

  'post /service/addservice': {
    controller: 'service',
    action: "addservice",
  },
  'get /service/service': {
    controller: 'service',
    action: "service",
  },
  'get /Service/getAllservice': {
    controller: 'service',
    action: "getAllservice",
  },
  'get /Service/getserviceById': {
    controller: 'service',
    action: "getserviceById",
  },
  'get /Service/subservice/:id': {
    controller: 'service',
    action: "subservice",
  },
  'post /service/upload': {
    controller: 'service',
    action: "upload",
  },
  // 'delete /delete/Servicecategory': {
  //   controller: 'servicecategory',
  //   action: "delete",
  // },
  'delete /Service/:id': {
    controller: 'service',
    action: "delete",
  },
  'put  /Service/update/': {
    controller: 'service',
    action: "update",
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
  'get /OrderService/:id': {
    controller: 'OrderService',
    action: "findById",
  },
  'post /OrderService/:id': {
    controller: 'OrderService',
    action: "findById",
  },
  'delete /OrderService/:id': {
    controller: 'OrderService',
    action: "delete",
  },
  'put  /OrderService/update/': {
    controller: 'OrderService',
    action: "update",
  },
  //*************************************BOOKINGSTATUS********************************************** */
  'get /Booking/BookingStatus': {
    controller:'Booking',
    action: "BookingStatus",
  },
  //*************************************IMAGE********************************************** */
  'GET /img/categories' :{
    view: 'categories'
  },
   'GET /img/services' :{
     view: 'services'
    },
};
