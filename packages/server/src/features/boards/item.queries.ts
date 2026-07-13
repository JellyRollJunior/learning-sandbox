import type { Section, Item } from '@prisma/client';
import { prisma } from '@/db/prisma.js';

const createItem = async (
    sectionId: Item['sectionId'],
    order: Item['order'],
    title: Item['title']
) => {
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

const editItem = async (id: Item['id'], title: Item['title']) => {
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

const moveItem = async (
    sectionId: Item['sectionId'],
    id: Item['id'],
    order: Item['order']
) => {
    try {
        const data = await prisma.item.update({
            where: {
                id: id,
            },
            data: {
                sectionId: sectionId,
                order: order,
            },
        });
        return data;
    } catch (error) {
        throw new Error('Unable to move item');
    }
};

const getItems = async (sectionId: Section['id']) => {
    try {
        const data = await prisma.item.findMany({
            where: {
                sectionId: sectionId,
            },
        });
        return data;
    } catch (error) {
        throw new Error('Unable to fetch items');
    }
};

export { createItem, editItem, moveItem, getItems };
