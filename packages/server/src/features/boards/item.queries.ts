import { prisma } from '@/db/prisma.js';

const createItem = async (sectionId: string, title: string, order: string) => {
    try {
        const data = await prisma.item.create({
            data: {
                sectionId: sectionId,
                title: title,
                order: order,
            },
        });
        return data;
    } catch (error) {
        throw new Error('Unable to create item');
    }
};

const editItem = async (id: string, title: string) => {
    try {
        const data = await prisma.item.update({
            where: {
                id: id,
            },
            data: {
                title: title,
            },
        });
        return data;
    } catch (error) {
        throw new Error('Unable to edit item');
    }
};

const moveItem = async (id: string, sectionId: string) => {
    try {
        const data = await prisma.item.update({
            where: {
                id: id,
            },
            data: {
                sectionId: sectionId,
            },
        });
        return data;
    } catch (error) {
        throw new Error('Unable to move item');
    }
};

export { createItem, editItem, moveItem };
