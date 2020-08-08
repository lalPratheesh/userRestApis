const db = require('../../db/models');
const {encrypt, decrypt} = require('../../helpers/encryption');
const {generateToken} = require('../../helpers/tokenManager');
const {setUserToken} = require('../../helpers/redisManager');
const {jwt: {expires}} = require('../../config');

exports.register = async (req, res, next) => {
    try {
        const {body: {email, password, name}} = req;
        if (!email || !password || !name) return res.status(422).json({
            success: false,
            message: 'Mandatory fields are required!'
        });

        const isExists = await db.User.findOne({email});
        if (isExists) return res.status(200).json({
            success: false,
            message: 'Email already exists!'
        });

        const user = await db.User.create({
            name, email, password: encrypt(password)
        });

        return res.json({
            success: true,
            message: 'Register successfully.',
            data: {user}
        });
    } catch (e) {
        return next(e);
    }
}

exports.login = async (req, res, next) => {
    try {
        const {body: {email, password}} = req;
        if (!email || !password) return res.status(422).json({
            success: false,
            message: 'Email and Password are required!'
        });

        const user = await db.User.findOne({email});
        if (!user || !user.password) return res.status(422).json({
            success: false,
            message: 'Invalid Email or Password'
        });

        if (decrypt(user.password) !== password.toString()) return res.status(422).json({
            success: false,
            message: 'Invalid Email or Password'
        });

        delete user.password;
        const token = await generateToken(user.id, user.email);

        setUserToken(user.id, {
            token,
            expiresIn: new Date(new Date().setMilliseconds(expires))
        });

        await db.ActivityLog.create({
            name: 'User_Login',
            userId: user.id,
            userToken: token
        });

        return res.json({
            success: true,
            message: 'Login successfully.',
            data: {user, token}
        });
    } catch (e) {
        return next(e);
    }
}
