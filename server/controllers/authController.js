const db = require('../config/db');

exports.signUp = async (req, res) => {
    try {
        const { Nom, Prenom, Email, Telephone, Motdepasse, TypeUtilisateur } = req.body;
        
        const [userResult] = await db.query(
            'INSERT INTO utilisateur (Nom, Prenom, Email, Telephone, Motdepasse) VALUES (?, ?, ?, ?, ?)',
            [Nom, Prenom, Email, Telephone, Motdepasse]
        );

        const IdUtilisateur = userResult.insertId;
        const table = TypeUtilisateur === 'Fournisseur' ? 'fournisseur' : 'chercheur';
        
        await db.query(
            `INSERT INTO ${table} (UtilisateurId) VALUES (?)`,
            [IdUtilisateur]
        );

        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            IdUtilisateur
        });
    } catch (error) {
        console.error('SignUp error:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.signIn = async (req, res) => {
    try {
        const { Telephone, Motdepasse } = req.body;
        const [users] = await db.query(
            'SELECT * FROM utilisateur WHERE Telephone = ? AND Motdepasse = ?',
            [Telephone, Motdepasse]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }

        const user = users[0];
        const [typeResult] = await db.query(`
            SELECT 
                CASE 
                    WHEN f.Id IS NOT NULL THEN 'Fournisseur' 
                    WHEN c.Id IS NOT NULL THEN 'Chercheur' 
                    ELSE 'Aucun' 
                END AS TypeUtilisateur
            FROM utilisateur u
            LEFT JOIN fournisseur f ON u.utilisateurId = f.UtilisateurId
            LEFT JOIN chercheur c ON u.utilisateurId = c.UtilisateurId
            WHERE u.utilisateurId = ?;
        `, [user.utilisateurId]);

        res.json({
            message: 'Login successful',
            user: {
                ...user,
                TypeUtilisateur: typeResult[0].TypeUtilisateur
            }
        });
    } catch (error) {
        console.error('SignIn error:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};