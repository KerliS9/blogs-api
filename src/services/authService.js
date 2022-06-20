const { User } = require('../database/models');
const statusCode = require('../utils/httpStatus');
const { generateJWTToken } = require('../utils/generateTokenJWT');

const authentication = async ({ email, password }) => {
    if (!email || !password) {
        return { status: statusCode.BAD_REQUEST, message: 'Some required fields are missing' };
    }

    const user = await User.findOne({
        attributes: ['displayName', 'email', 'id', 'image'],
        where: { email, password },
    });

    if (!user) {
        return { status: statusCode.BAD_REQUEST, message: 'Invalid fields' };
    }

    const token = generateJWTToken(user.dataValues);
    return { token };
};

module.exports = {
    authentication,
};