module.exports = (io, db) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('sendMessage', async (data) => {
            try {
                const { SenderId, ReceiverId, Message, Date } = data;
                const [result] = await db.query(
                    'INSERT INTO chat (SenderId, ReceiverId, Message, Date) VALUES (?, ?, ?, ?)',
                    [SenderId, ReceiverId, Message, Date]
                );
                io.to(ReceiverId).emit('receiveMessage', { ...data, Date });
            } catch (error) {
                console.error('Socket error:', error);
            }
        });

        socket.on('join', (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined room`);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};