const db = require('../config/db');

exports.getUsers = async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM utilisateurs');
        res.json(users);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nom, Prenom, Telephone, Adresse, ImageProfileUrl } = req.body;
        
        const [result] = await db.query(
            `UPDATE utilisateur 
            SET Nom = ?, Prenom = ?, Telephone = ?, Adresse = ?, ImageProfileUrl = ?
            WHERE utilisateurId = ?`,
            [Nom, Prenom, Telephone, Adresse, ImageProfileUrl, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json({ message: 'Profil mis à jour avec succès' });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};