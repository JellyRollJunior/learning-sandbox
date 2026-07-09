import { prisma } from '@/db/prisma.js';

const getBoards = async () => {
    try {
        const data = await prisma.board.findMany();
        return data;
    } catch (error) {
        throw new Error('Unable to fetch boards');
    }
};

const getBoard = async (id: string) => {
    try {
        const data = await prisma.board.findFirst({
            where: {
                id: id,
            },
        });
        return data;
    } catch (error) {
        throw new Error('Unable to fetch board');
    }
};

export { getBoards, getBoard };
