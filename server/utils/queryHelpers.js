const db = require('../config/db');

exports.executeQuery = async (query, params) => {
    try {
        const [results] = await db.query(query, params);
        return results;
    } catch (error) {
        throw new Error(`Query execution failed: ${error.message}`);
    }
};