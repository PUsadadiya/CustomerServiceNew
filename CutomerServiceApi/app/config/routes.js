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
  //**************************************SERVICE********************************************* */
  'post /service/addservice': {
    controller: 'service',
    action: "addservice",
  },
  'get /service/view': {
    controller: 'service',
    action: "view",
  },
  'get /service/:id': {
    controller: 'service',
    action: "findById",
  },
  'delete /service/:id': {
    controller: 'service',
    action: "delete",
  },
  'put /service/update/': {
    controller: 'service',
    action: "update",
  },
  //***********************************CATEGORY******************************************** */

  'post /servicecategory/addcategory': {
    controller: 'servicecategory',
    action: "addcategory",
  },
  'get /servicecategory/category': {
    controller: 'servicecategory',
    action: "category",
  },
  'get /Servicecategory/getAllCategory': {
    controller: 'servicecategory',
    action: "getAllCategory",
  },
  'get /Servicecategory/getCategoryById': {
    controller: 'servicecategory',
    action: "getCategoryById",
  },
  'get /Servicecategory/subcategory/:id': {
    controller: 'servicecategory',
    action: "subcategory",
  },
  // 'delete /delete/Servicecategory': {
  //   controller: 'servicecategory',
  //   action: "delete",
  // },
  'delete /Servicecategory/:id': {
    controller: 'servicecategory',
    action: "delete",
  },
  'put  /Servicecategory/update/': {
    controller: 'servicecategory',
    action: "update",
  }
  //*********************************************************************************** */
};
