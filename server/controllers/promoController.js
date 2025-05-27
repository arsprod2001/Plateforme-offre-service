const db = require('../config/db');

exports.getPromotions = async (req, res) => {
    try {
        const [promotions] = await db.query(`
            SELECT 
                P.DateDebut, 
                P.DateFin, 
                S.ServiceId, 
                S.Nom, 
                S.thumbnail, 
                R.Pourcentage, 
                U.ImageProfileUrl, 
                U.Prenom, 
                S.Prix, 
                U.Adresse
            FROM Service S
            JOIN Promotion P ON S.ServiceId = P.ServiceId
            JOIN Reduction R ON P.PromoId = R.PromoId
            JOIN utilisateur U ON S.FournisseurId = U.utilisateurId
        `);
        res.json(promotions);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};