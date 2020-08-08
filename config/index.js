require('dotenv-flow').config();

module.exports = {
    env: process.env.NODE_ENV || 'development',
    server: {
        hostUrl: process.env.HOST_URL,
        port: process.env.PORT || 5000,
    },
    database: {
        url: process.env.DB_URL
    },
    encryptionKey: process.env.ENCRYPTION_KEY,
    jwt: {
        secretKey: process.env.JWT_SECRET_KEY,
        expires: process.env.JWT_EXPIRES_IN_HOURS
    }
};
