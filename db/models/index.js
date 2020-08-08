const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const {database} = require("../../config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = database.url;

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(mongoose);
        db[model.modelName] = model;
    });

module.exports = db;
