import type { Item, Section } from './data.ts';
import { data } from './data.ts';

const KanbanBoardPage = () => {
  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <h1 className="mt-5 text-center text-xl font-bold">
          Welcome to the Kanban Board Page!
        </h1>
        <main className='flex-1'>
          <div className='mx-5 mt-5 h-full rounded-lg border-2 border-black p-2'>
            <h2 className='text-center text-md'>This is the board</h2>
            <ul className='w-full flex border border-black p-2 items-center justify-center gap-6'>
              
            </ul>
          </div>
        </main>
      </div>
    </>
  );
};

export { KanbanBoardPage };
