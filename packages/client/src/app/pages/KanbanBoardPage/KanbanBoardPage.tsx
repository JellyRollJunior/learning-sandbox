import { useCallback, useState, type PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import type { Item, Section } from './data.ts';
import { data } from './data.ts';

interface Position {
  x: number;
  y: number;
}

// TODO NEXT: gray out / opacity on item currently being dragged

type boardProps = { data: Section[] };
const Board = ({ data }: boardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItemData, setDraggedItemData] = useState<Item | null>(null);
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });

  const registerDraggedItem = useCallback((event: PointerEvent, item: Item) => {
    setIsDragging(true);
    // event.currentTarget.setPointerCapture(event.pointerId);
    setPos({ x: event.clientX, y: event.clientY });
    setDraggedItemData(item);
  }, []);

  const recordCursorCoordinates = useCallback(
    (event: PointerEvent) => {
      if (isDragging == false) return;

      setPos({ x: event.clientX, y: event.clientY });
    },
    [isDragging]
  );

  const removeDraggedItem = useCallback(() => {
    setIsDragging(false);
    setDraggedItemData(null);
  }, []);

  const moveDraggedItem = useCallback((section: Section) => {
    if (!isDragging) return;

    console.log(`Moving item - ${draggedItemData?.id} : ${draggedItemData?.name} to section - ${section.id} : ${section.name}`)

  }, [isDragging, draggedItemData])

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
            onPointerUp={() => moveDraggedItem(section)}
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
                  onPointerDown={(event: PointerEvent) =>
                    registerDraggedItem(event, item)
                  }
                >
                  {item.id} : {item.name}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>

      {/* Dragging Ghost */}
      {isDragging && draggedItemData &&
        createPortal(
          <div
            className="pointer-events-none absolute border border-red-300 bg-red-200 px-5 py-1"
            style={{ left: pos.x, top: pos.y }}
          >
            {draggedItemData.id} : {draggedItemData.name}
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
    </div>
  );
};

export { KanbanBoardPage };
