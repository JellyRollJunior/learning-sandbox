import type { RouteObject } from 'react-router-dom';
import { App } from '@/app/App.tsx';
import { HomePage } from '@/app/pages/HomePage';
import { DragAndDropPage } from '@/app/pages/DragAndDropPage';
import { KanbanBoardPage } from '@/app/pages/KanbanBoardPage';
import { KanbanBoardPage2 } from '@/app/pages/KanbanBoardPage2';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: '/drag-and-drop',
    element: <DragAndDropPage />,
  },
  {
    path: '/kanban-board',
    element: <KanbanBoardPage />,
  },
  {
    path: '/kanban-board-2',
    element: <KanbanBoardPage2 />,
  },
];

export { routes };
