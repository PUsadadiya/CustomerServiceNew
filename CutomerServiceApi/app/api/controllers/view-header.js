module.exports = {


  friendlyName: 'View header',


  description: 'Display "Header" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/header'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
