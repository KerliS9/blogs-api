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
        return { statusCode: 401, message: 'Sem Token' };
    }

    try {
        const introspection = await jwt.verify(token, SECRET, jwtConfig);
        return introspection;
    } catch (e) {
        console.log('generateTokenJWT', e.message);
        return { statusCode: 401, message: 'token inválido' };
    }
};

module.exports = {
    generateJWTToken,
    authenticateToken,
};