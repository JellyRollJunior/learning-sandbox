import { useCallback, useState, type PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import type { Item, Section } from './data.ts';
import { data } from './data.ts';

interface Position {
  x: number;
  y: number;
}

type boardProps = { data: Section[] };
const Board = ({ data }: boardProps) => {
  const [draggedItem, setDraggedItem] = useState<{ item: Item, sectionId: Section["id"] } | null>(null);
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });

  const registerDraggedItem = useCallback((event: PointerEvent, item: Item, section: Section) => {
    setDraggedItem({ item: item, sectionId: section.id});
    setPos({ x: event.clientX, y: event.clientY });
  }, []);

  const recordCursorCoordinates = useCallback(
    (event: PointerEvent) => {
      if (!draggedItem) return;

      setPos({ x: event.clientX, y: event.clientY });
    },
    [draggedItem]
  );

  const removeDraggedItem = useCallback(() => {
    setDraggedItem(null);
  }, []);

  const isCursorOnTopHalfOfItem = (event: PointerEvent) => {
    // item halfway point == top + height / 2
    
    const item = event.currentTarget.getBoundingClientRect();
    const cursorY = event.clientY;
    const itemHalfPoint = item.top + (item.height / 2);
    console.log(`is: ${item.top} ${item.height} ${cursorY}`)
    console.log(item)

    return cursorY <= itemHalfPoint
  }

  const moveDraggedItem = useCallback((event: PointerEvent, section: Section) => {
    console.log(`x: ${event.clientX} - y: ${event.clientY}`)
    console.log(isCursorOnTopHalfOfItem(event))
    if (!draggedItem) return;
    if (draggedItem?.sectionId === section.id) return;

    console.log(
      `Moving item - ${draggedItem?.item.id} : ${draggedItem?.item.name} to section - ${section.id} : ${section.name}`
    )

  }, [draggedItem])

  return (
    <>
      {/* Board */}
      <ul
        className="flex w-full items-center justify-center gap-6 border border-black p-2"
        onPointerMove={recordCursorCoordinates}
        onPointerUp={removeDraggedItem}
        onPointerLeave={removeDraggedItem}
      >
        
        {/* Sections */}
        {data && data.map((section) => (
          <li
            className="border-blue min-h-50 min-w-50 border"
            key={section.id}
          >
            <h3 className="text-center">
              {section.id} : {section.name}
            </h3>

            {/* items */}
            <ol className="flex flex-col gap-2 p-2">
              {section.items.map((item: Item) => (
                <li
                  className="border border-black px-2 py-1 select-none"
                  key={item.id}
                  onPointerDown={(event: PointerEvent) => registerDraggedItem(event, item, section)}
                  onPointerUp={(event: PointerEvent) => moveDraggedItem(event, section)}
                >
                  {item.id} : {item.name}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>

      {/* Dragging Ghost */}
      {draggedItem &&
        createPortal(
          <div
            className="pointer-events-none absolute border border-red-300 bg-red-200 px-5 py-1"
            style={{ left: pos.x, top: pos.y }}
          >
            {draggedItem.item.id} : {draggedItem.item.name}
          </div>,
          document.body
        )}
    </>
  );
};

const KanbanBoardPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <h1 className="mt-5 text-center text-xl font-bold">
        Welcome to the Kanban Board Page!
      </h1>
      <main className="flex-1">
        <div className="mx-5 mt-5 h-full rounded-lg border-2 border-black p-2">
          <h2 className="text-md text-center">This is the board</h2>
          <Board data={data} />
        </div>
      </main>

      <div className='size-50 bg-black' draggable></div>
    </div>
  );
};

export { KanbanBoardPage };


// video notes
// drag
// on dragstart ondragend
// cursor: grab
// active styling aka on drag styling 