import type { Board, Item } from '@prisma/client';
import type { Request, Response, NextFunction } from 'express';
import * as boardQueries from '@/features/boards/board.queries.js';
import * as itemQueries from '@/features/boards/item.queries.js';
import { generateKeyBetween } from 'fractional-indexing';

const getBoards = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const boards = await boardQueries.getBoards();

        res.json(boards);
    } catch (error) {
        next(error);
    }
};

const getBoard = async (
    req: Request<{ boardId: Board['id'] }, {}, {}>,
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

const createItem = async (
    req: Request<
        {},
        {},
        {
            sectionId: Item['sectionId'];
            orderAfter: Item['order'] | null;
            title: Item['title'];
        }
    >,
    res: Response,
    next: NextFunction
) => {
    try {
        const { sectionId, title, orderAfter } = req.body;
        // generate order index
        const items = await itemQueries.getItemsBySection(sectionId);
        // if order invalid, generate as last place
        let order = '';
        if (items.length > 0) {
            // insert beginning of list
            if (orderAfter === null) {
                order = generateKeyBetween(null, items[0]?.order);
            }
            // insert at end of list
            else if (orderAfter == items.at(-1)?.order) {
                order = generateKeyBetween(items.at(-1)?.order, null);
            }
            // insert middle of list
            else {
                let insertAfterIndex = items
                    .map((item) => item.order)
                    .indexOf(orderAfter);
                order = generateKeyBetween(
                    items[insertAfterIndex]?.order,
                    items[insertAfterIndex + 1]?.order
                );
            }
        } else {
            // insert to empty list
            order = generateKeyBetween(null, null);
        }
        const data = await itemQueries.createItem(sectionId, order, title);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export { getBoards, getBoard, createItem };
