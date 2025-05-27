const db = require('../config/db');

const handleDatabaseError = (res, error) => {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database operation failed' });
};

module.exports = {
    handleDatabaseError
};