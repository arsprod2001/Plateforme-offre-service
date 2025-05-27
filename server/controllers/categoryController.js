const db = require('../config/db');

exports.getAllCategories = async (req, res) => {
    try {
        const [categories] = await db.query('SELECT * FROM categorie');
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

exports.getCategoryServices = async (req, res) => {
    try {
        const { id } = req.params;
        const [services] = await db.query(`
            SELECT 
                S.ServiceId,
                C.Nom AS NomCategorie, 
                S.Nom AS NomService, 
                S.Prix, 
                S.Thumbnail, 
                U.Prenom, 
                U.Adresse, 
                U.ImageProfileUrl
            FROM categorie C
            INNER JOIN service S ON C.CategorieId = S.CategorieId
            INNER JOIN utilisateur U ON S.FournisseurId = U.utilisateurId
            WHERE S.CategorieId = ?
        `, [id]);
        res.json(services);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};