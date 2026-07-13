import type { Router } from 'express';
import { Router as CreateRouter } from 'express';
import * as boardController from '@/features/boards/controller.js';

const boardRouter: Router = CreateRouter();

boardRouter.get('/', boardController.getBoards)
boardRouter.get('/:boardId', boardController.getBoard)
boardRouter.post('/test', boardController.createItem)

export { boardRouter };
