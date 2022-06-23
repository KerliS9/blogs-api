const { authenticateToken } = require('../utils/generateTokenJWT');
const statusCode = require('../utils/httpStatus');

const authenticationMiddleware = async (req, _res, next) => {
    const token = req.headers.authorization;
    // console.log('authenticationMiddleware', token);
    
    /* if (!token) {
        return { statusCode: statusCode.UNAUTHORIZED, message: 'Token not found' };
    } */
    
    try {
        const payload = await authenticateToken(token);
        // console.log('payload', payload);
        // res.locals.payload = payload;
        if (!payload) {
            return next({ statusCode: statusCode.UNAUTHORIZED, message: 'Token not found' });
        }
        next();
    } catch (e) {
        return next({ statusCode: statusCode.UNAUTHORIZED, message: 'Expired or invalid token' });
    }    
};

module.exports = { authenticationMiddleware };