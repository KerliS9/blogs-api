const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

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
    return introspection;
};

module.exports = {
    generateJWTToken,
    authenticateToken,
};