const jwt = require('jsonwebtoken');
require('dotenv').config();
// const statusCode = require('./httpStatus');

const SECRET = process.env.JWT_SECRET; // suaSenhaSecreta

const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
};

const generateJWTToken = (payload) => 
    jwt.sign(payload, SECRET, jwtConfig);

const authenticateToken = async (token) => {
    if (!token) {
        return false;
    }

    const introspection = jwt.verify(token, SECRET, jwtConfig);
    // console.log('introspection', introspection);
    return introspection;
};

module.exports = {
    generateJWTToken,
    authenticateToken,
};