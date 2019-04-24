/**
 * Service to generate JWT
 */
// var jwt = require('jsonwebtoken');
// var secret = require('../../config/env/secret').secret;
// console.log(secret);

// module.exports = {
// 	'sign': function(payload) {
// 		return jwt.sign({
// 			data: payload
// 		}, 'sails.config.secret', {expiresIn: '1d'});
// 	},
// 	'verify': function(token, callback) {
// 		jwt.verify(token, 'sails.config.secret', callback);
// 	}
// };
var jwt = require('jsonwebtoken');
var secret = require('../../config/env/secret').secret;
module.exports = {
	'sign': function(payload) {
		return jwt.sign({
			data: payload
		}, secret, {expiresIn: '1d'});
	},
	'verify': function(token, callback) {
		jwt.verify(token, secret, callback);
	}
};
