const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Erreur de validation',
            errors: err.errors
        });
    }

    res.status(500).json({
        message: 'Une erreur inattendue est survenue',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
};

module.exports = errorHandler;