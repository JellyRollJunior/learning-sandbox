import type { Item, Section } from '@prisma/client';
import type { Server } from 'socket.io';
import { handleMoveItem } from './socketListeners.js';

const attachSocketListeners = (io: Server) => {
    io.on('connection', (socket) => {
        console.log(`Connected with socket ID: ${socket.id}`);

        socket.on(
            'board:move-item',
            (
                sectionId: Section['id'],
                itemId: Item['id'],
                orderAfter: Item['order'],
            ) => handleMoveItem(socket, sectionId, itemId, orderAfter)
        );
    });
};

export { attachSocketListeners };
