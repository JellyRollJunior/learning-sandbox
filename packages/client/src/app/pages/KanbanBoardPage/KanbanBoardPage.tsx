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

            {/* Board */}
            <ul className='w-full flex border border-black p-2 items-center justify-center gap-6'>

              {/* Sections */}
              {data.map((section: Section) => (
                <li className='min-w-50 min-h-50 border border-blue'>
                  <h3 className='text-center'>{section.id} : {section.name}</h3>

                  {/* items */}
                  <ol className='flex flex-col p-2 gap-2'>
                    {section.items.map((item: Item) => (
                      <li className='pl-2 border border-black'>
                        {item.id} : {item.name}
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
};

export { KanbanBoardPage };
