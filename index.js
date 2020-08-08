const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const createError = require('http-errors');
const logger = require('morgan');
const {unless, authMiddleware} = require('./middlewares/authentication');

const {server: {port}} = require('./config');
const db = require('./db/models');

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(unless(authMiddleware));

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use(require('./helpers/serverError'));

app.listen(port, async () => {
    console.log(`App listening at port ${port}`)
});
