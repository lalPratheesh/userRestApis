module.exports = (err, req, res, next) => returnError(err, err.status, err.message, res);

const returnError = (error, status = 500, message, res) => {
    console.error(error);
    return res.status(status || 500)
        .json({
            success: false,
            message,
            error,
        });
};
