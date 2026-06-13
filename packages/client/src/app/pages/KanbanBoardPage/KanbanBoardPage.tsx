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
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });

  const onPointerDown = useCallback((event: PointerEvent) => {
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    setPos({ x: event.clientX, y: event.clientY });
  }, []);

  const onPointerMove = useCallback((event: PointerEvent) => {
    if (isDragging == false) return;

    setPos({ x: event.clientX, y: event.clientY });
  }, [isDragging]);

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <>
      {/* Board */}
      <ul className="flex w-full items-center justify-center gap-6 border border-black p-2">
        {/* Sections */}
        {data.map((section) => (
          <li key={section.id} className="border-blue min-h-50 min-w-50 border">
            <h3 className="text-center">
              {section.id} : {section.name}
            </h3>

            {/* items */}
            <ol className="flex flex-col gap-2 p-2">
              {section.items.map((item: Item) => (
                <li
                  className="border border-black px-2 py-1 select-none"
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                >
                  {item.id} : {item.name}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>

      {/* Dragging Ghost */}
      {isDragging &&
        createPortal(
          <div
            className="pointer-events-none absolute h-5 w-10 bg-blue-200"
            style={{ left: pos.x, top: pos.y }}
          ></div>,
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
