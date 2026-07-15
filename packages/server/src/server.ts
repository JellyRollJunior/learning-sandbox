import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { env } from '@/config/env.js';
import { app } from '@/app.js';
import { instrument } from '@socket.io/admin-ui';
import { attachSocketListeners } from '@/sockets/attachSocketListeners.js';
import bcrypt from 'bcryptjs';

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://admin.socket.io'],
        credentials: true,
    },
});

instrument(io, {
    auth: {
        type: 'basic',
        username: 'test',
        password: await bcrypt.hash('test', 10),
    },
    mode: 'development',
});

attachSocketListeners(io);

server.listen(Number(env.port), '0.0.0.0', () => {
    console.log(`Listening on port: ${env.port}`);
});
