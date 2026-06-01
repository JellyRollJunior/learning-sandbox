import type { RouteObject } from 'react-router-dom';
import { App } from '@/App.tsx';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [{ index: true, element: <h1>Hello World</h1> }],
  },
];

export { routes };
