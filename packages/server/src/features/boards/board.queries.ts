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
            select: {
                id: true,
                order: true,
                title: true,
                sections: {
                    select: {
                        id: true,
                        order: true,
                        title: true,
                        items: {
                            select: {
                                id: true,
                                order: true,
                                title: true,
                            },
                            orderBy: {
                                order: 'asc',
                            }
                        },
                    },
                    orderBy: {
                        order: 'asc',
                    }
                },
                orderBy: {
                    order: 'asc',
                }
            },
        });
        return data;
    } catch (error) {
        throw new Error('Unable to fetch board');
    }
};

export { getBoards, getBoard };
