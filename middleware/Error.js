const fs = require('fs/promises');

const errorMiddleware = async (err, req, res, next) => {
    err.message = err.message || 'Something went wrong, try again later';
    err.statusCode = err.statusCode || 500;

    /* MONGODB DUPLICATE ERROR */
    if (err.code === 11000) {
        err.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        err.statusCode = 400;
    }

    /* MONGODB VALIDATION ERROR */
    if (err.name === 'ValidationError') {
        err.message = Object.values(err.errors).map((val) => val.message).join(', ');
        err.statusCode = 400;
        if (req.file) await fs.unlink(req.file.path); // delete file from server if validation error
    }
    if(err.name === 'CastError') {
        err.message = `No data found with petId ${err.value}`;
        err.statusCode = 404;
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

module.exports = { errorMiddleware };
