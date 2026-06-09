import type { Item, Section } from './data.ts';
import { useCallback, useRef, type PointerEvent } from 'react';
import { data } from './data.ts';

type SectionItemProps = { item: Item };
const SectionItem = ({ item }: SectionItemProps) => {
  const itemRef = useRef<HTMLLiElement | null>(null);
  const isDragging = useRef(false);

  const onPointerDown = useCallback((event: PointerEvent) => {
    isDragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    
    console.log(`${item.id}: ${isDragging.current}`);
  }, [item]);

  const onPointerMove = useCallback((event: PointerEvent) => {
    if (!isDragging.current) return;
    
  }, []);

  const onPointerUp = useCallback((event: PointerEvent) => {
    isDragging.current = false;
    console.log(`${item.id}: ${isDragging.current}`);
  }, [item]);

  return (
    <li
      className="border border-black pl-2"
      ref={itemRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {item.id} : {item.name}
    </li>
  );
};

const KanbanBoardPage = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <h1 className="mt-5 text-center text-xl font-bold">
          Welcome to the Kanban Board Page!
        </h1>
        <main className="flex-1">
          <div className="mx-5 mt-5 h-full rounded-lg border-2 border-black p-2">
            <h2 className="text-md text-center">This is the board</h2>

            {/* Board */}
            <ul className="flex w-full items-center justify-center gap-6 border border-black p-2">
              
              {/* Sections */}
              {data.map((section: Section) => (
                <li
                  key={section.id}
                  className="border-blue min-h-50 min-w-50 border"
                >
                  <h3 className="text-center">
                    {section.id} : {section.name}
                  </h3>

                  {/* items */}
                  <ol className="flex flex-col gap-2 p-2">
                    {section.items.map((item: Item) => (
                      <SectionItem key={item.id} item={item} />
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
