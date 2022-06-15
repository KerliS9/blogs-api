const { User } = require('../database/models');
const { generateJWTToken } = require('../utils/generateTokenJWT');

const authentication = async ({ email, password }) => {
    if (!email || !password) {
        return { statusCode: 401, message: 'Campos faltantes.' };
    }

    const user = await User.findOne({
        attributes: ['displayName', 'email', 'id', 'image'],
        where: { email, password },
    });

    if (!user) {
        return { statusCode: 401, message: 'Usuário ou senha inválido' };
    }

    const token = generateJWTToken(user.dataValues);
    return { token };
};

module.exports = {
    authentication,
};