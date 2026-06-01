import type { User } from '@prisma/client';
import { prisma } from '@/db/prisma.js';

const getUsers = async (): Promise<User[]> => {
    try {
        const data = await prisma.user.findMany();
        return data;
    } catch (error) {
        throw new Error('Unable to fetch users');
    }
};

const getUserById = async (id: string): Promise<User | null> => {
    try {
        const data = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        return data;
    } catch (error) {
        throw new Error('Unable to fetch user');
    }
};

const getUserByUsername = async (username: string): Promise<User | null> => {
    try {
        const data = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        return data;
    } catch (error) {
        throw new Error('Unable to fetch user');
    }
};

const getUserByGithubId = async (githubId: string): Promise<User | null> => {
    try {
        const data = await prisma.user.findUnique({
            where: {
                github_id: githubId,
            },
        });
        return data;
    } catch (error) {
        throw new Error('Unable to fetch user');
    }
};

const createUser = async (
    username: string,
    password: string,
    displayName: string
): Promise<User> => {
    try {
        const data = await prisma.user.create({
            data: {
                username,
                password,
                displayName,
            },
        });
        return data;
    } catch (error) {
        throw new Error('Unable to create user');
    }
};

const createGithubUser = async (githubId: string, displayName: string) => {
    try {
        const data = await prisma.user.create({
            data: {
                github_id: githubId,
                displayName: displayName,
            },
        });
        return data;
    } catch (error) {
        throw new Error('Unable to create user');
    }
};

export {
    getUsers,
    getUserById,
    getUserByUsername,
    getUserByGithubId,
    createUser,
    createGithubUser,
};
