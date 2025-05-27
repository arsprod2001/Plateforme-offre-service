const db = require('../config/db');

exports.getUserServices = async (req, res) => {
    try {
        const { id } = req.params;
        const [services] = await db.query(`
            SELECT S.ServiceId, S.thumbnail, U.ImageProfileUrl, U.Prenom, 
                   S.Nom AS ServiceNom, S.Prix, U.Adresse
            FROM service S
            JOIN fournisseur F ON S.FournisseurId = F.Id
            JOIN utilisateur U ON F.UtilisateurId = U.utilisateurId
            WHERE F.utilisateurId = ?;
        `, [id]);
        res.json(services);
    } catch (error) {
        console.error('Get services error:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nom, Description, Prix } = req.body;
        
        const [result] = await db.query(
            `UPDATE service SET Nom = ?, Description = ?, Prix = ?
            WHERE ServiceId = ?`,
            [Nom, Description, Prix, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Service non trouvé' });
        }

        res.json({ message: 'Service mis à jour avec succès' });
    } catch (error) {
        console.error('Update service error:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};