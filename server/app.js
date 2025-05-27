const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const db = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const setupSocket = require('./config/socket');

// Import des routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/services', serviceRoutes);

// Configuration Socket.IO
setupSocket(io, db);

// Gestion des erreurs
app.use(errorHandler);

// Connexion à la base de données
db.getConnection()
    .then(connection => {
        console.log('Connecté à la base de données MySQL');
        connection.release();
    })
    .catch(err => {
        console.error('Erreur de connexion à la base de données:', err);
        process.exit(1);
    });

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

module.exports = app;