const db = require('../../db/models');
const {generateToken} = require('../../helpers/tokenManager');
const {setUserToken, getUserToken} = require('../../helpers/redisManager');
const {jwt: {expires}} = require('../../config');

exports.currentUser = async (req, res, next) => {
    try {
        const {user: {id}} = req;

        const user = await db.User.findById(id).select('name email createdAt').exec();
        if (!user) return res.status(404).json({
            success: false,
            message: 'User not found!'
        });

        // refreshing the token in redis
        const token = await generateToken(user.id, user.email);
        setUserToken(user.id, {
            token,
            expiresIn: new Date(new Date().setMilliseconds(expires))
        });

        // const redisValue = await getUserToken(user.id);

        return res.json({
            success: true,
            message: 'User fetched successfully.',
            data: {user}
        });
    } catch (e) {
        return next(e);
    }
}

exports.loginList = async (req, res, next) => {
    try {
        const {user: {id}} = req;
        // get current user login activity
        const loginList = await db.ActivityLog.find({name: 'User_Login', userId: id});

        return res.json({
            success: true,
            message: 'User fetched successfully.',
            data: {loginList}
        });
    } catch (e) {
        return next(e);
    }
}
