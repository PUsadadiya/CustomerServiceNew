/**
 * ServiceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
// var multer = require('multer');
// var http = require('http');
// var nStatic = require('node-static');


module.exports = {
  addcategory: function (req, res) {
    category.create(req.body).then(function (err, newcategory) {
      if (err) {
        return res.ok("No Category Added!!");
      } else {
        return res.ok("Category Added!");
      }
    }).catch(function (err) {
      return res.status(404).send({
        message: "BAD_REQUEST"
      });
    });
  },
  view: function (req, res) {
    return category.find().then(function (_category) {
      if (_category && _category.length > 0) {
        return res.ok(_category);
      } else {
        return res.notfound('Category Not Found');
      }
    }).catch(function (err) {
      return res.serverError('Category Not Found');
    });
  },
  findById: function (req, res) {
    var id = req.param('id');
    return category.find().where({
      id: id
    }).then(function (_category) {
      if (_category && _category.length > 0) {
        return res.ok(_category[0]);
      } else {
        return res.notfound('Category Not Found');
      }
    }).catch(function (err) {
      return res.serverError('Category Not Found');
    });
  },
  delete: function (req, res) {
    category.destroy({
      id: req.param("id")
    }).exec(function (err) {
      if (err) {
        res.json({
          err: err
        })
      }
      res.json('Category Removed');
    })
  },
  update: function (req, res) {
    var categories = req.body;
    category.update({
      id: categories.id
    }).set({
      type: categories.type,
      size: categories.size,
      category: categories.category
    }).exec(function (err, updatedcategory) {
      if (err) {
        return res.negotiate(err);
      } else {
        return res.ok(' Category Updated');
      }
    });
  },
  upload: function (req, res) {
    // var fileServer = new nStatic.Server('./image');

    var fileName = req.body.category.split('.').slice(0, -1).join('.') + '.jpg';
    req.file('image').upload({
      maxBytes: 10485760,
      saveAs: __dirname + '/../../assets/img/categories/' + fileName
    }, function (err, uploadedFile) {
      if (err) {
        return res.negotiate(err);
      }

      // req.body.image = uploadedFile[0].fd;
       req.body.image = 'http://localhost:1337/img/categories/' + uploadedFile[0].filename.split('.').slice(0, -1).join('.') + '.jpg';
      req.body.type=uploadedFile[0].type;
      req.body.size=uploadedFile[0].size;
      req.body.category = uploadedFile[0].filename.split('.').slice(0, -1).join('.');
      category.create(req.body).then(function (err, newcategory) {
        if (err) {
          return res.ok("No Category Added!!");
        } else {
          return res.ok("Category Added!");
        }
      })
      // fileServer.serve(req, res);

    });
  }
};
