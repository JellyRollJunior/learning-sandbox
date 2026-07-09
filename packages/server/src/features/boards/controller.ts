import type { Request, Response, NextFunction } from 'express';
import * as boardQueries from '@/features/boards/board.queries.js';

const getBoards = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const boards = await boardQueries.getBoards();

        res.json(boards);
    } catch (error) {
        next(error);
    }
};

const getBoard = async (
    req: Request<{ boardId: string }, {}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const boardId = req.params.boardId;
        const board = await boardQueries.getBoard(boardId);
        
        res.json(board);
    } catch (error) {
        next(error);
    }
};

export { getBoards, getBoard };
