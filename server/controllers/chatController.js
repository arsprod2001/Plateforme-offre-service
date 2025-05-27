const db = require('../config/db');

exports.getChatHistory = async (req, res) => {
    try {
        const { utilisateurId } = req.params;
        const [chats] = await db.query(`
            SELECT 
                u.utilisateurId,
                u.ImageProfileUrl,
                u.Prenom,
                c.Message,
                c.Date
            FROM 
                chat c, utilisateur u
            WHERE 
                (c.ReceiverId = u.utilisateurId OR c.SenderId = u.utilisateurId)
                AND c.Date = (
                    SELECT 
                        MAX(c1.Date)
                    FROM 
                        chat c1
                    WHERE 
                        (c1.ReceiverId = ? AND c1.SenderId = u.utilisateurId)
                        OR (c1.SenderId = ? AND c1.ReceiverId = u.utilisateurId)
                )
                AND (c.ReceiverId = ? OR c.SenderId = ?)
                AND u.utilisateurId != ?
            ORDER BY 
                c.Date DESC
        `, [utilisateurId, utilisateurId, utilisateurId, utilisateurId, utilisateurId]);
        res.json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};