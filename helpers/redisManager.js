const redis = require("redis");
const client = redis.createClient();

client.on("connect", function () {
    console.log("Redis plugged in.");
});
client.on("error", function (error) {
    console.error(error);
});

const setUserToken = (userId, payload) => {
    return client.set(userId, JSON.stringify(payload));
}

const getUserToken = (userId) => {
    return new Promise((resolve, reject) => {
        client.get(userId, function (err, value) {
            if (err) return reject(err);
            if (value) return resolve(JSON.parse(value));
            return reject();
        });
    });
}

module.exports = {
    setUserToken,
    getUserToken,
};
