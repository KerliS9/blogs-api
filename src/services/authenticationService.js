const { User } = require('../database/models');
const { generateJWTToken } = require('../utils/generateTokenJWT');

const authentication = async ({ email, password }) => {
    if (!email || !password) {
        return { statusCode: 400, message: 'Some required fields are missing' };
    }

    const user = await User.findOne({
        attributes: ['displayName', 'email', 'id', 'image'],
        where: { email, password },
    });

    if (!user) {
        return { statusCode: 400, message: 'Invalid fields' };
    }

    const token = generateJWTToken(user.dataValues);
    return { token };
};

module.exports = {
    authentication,
};