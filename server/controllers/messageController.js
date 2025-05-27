const db = require('../config/db');

exports.getMessages = async (req, res) => {
    try {
        const { SenderId, ReceiverId } = req.query;
        const [messages] = await db.query(
            `SELECT * FROM chat 
            WHERE (SenderId = ? AND ReceiverId = ?) 
            OR (SenderId = ? AND ReceiverId = ?) 
            ORDER BY Date`,
            [SenderId, ReceiverId, ReceiverId, SenderId]
        );
        res.json(messages);
    } catch (error) {
        console.error('Get messages error:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};