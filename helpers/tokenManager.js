const jwt = require('jsonwebtoken');
const {jwt: {secretKey, expires}} = require('../config');

exports.generateToken = (id, email) => {
    return jwt.sign({id, email}, secretKey, {expiresIn: expires});
};

exports.verifyAccessToken = (token) => new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return reject(false);
        }
        return resolve(decoded);
    });
});
