const { verifyAccessToken } = require('../helpers/tokenManager');
const ignorePaths = [
    '/auth'
];

const unless = (middleware) => (req, res, next) => {
    const pathCheck = ignorePaths.some(path => req.originalUrl.startsWith(path));
    pathCheck ? next() : middleware(req, res, next);
};

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token || token === '') {
            return res.status(401).send({
                success: false,
                message: 'Token not found.'
            });
        }
        req.user = await verifyAccessToken(token);
        next();
    } catch (e) {
        return res.status(403).send({
            success: false,
            message: 'Invalid token.'
        });
    }
};

module.exports = {
    unless,
    authMiddleware,
};
