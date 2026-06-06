import { useCallback, useRef, useState, type PointerEvent } from 'react';

/**
 * Naive Drag and Drop
 *
 * use onPointer because it records mouse/touch/etc.
 *
 * * Theory:
 * - on element drag, cursor will be positioned in same place inside the element
 *    - setPointerCapture to prevent cursor outrunning element
 *    - if cursor moves out of element, the events will no longer be sent to element unless setPointerCapture is used
 * - record relative position as an offset from the elements top left corner
 * - set element position in relation to currentMousePosition - offset
 *
 * 1. onPointerDown, record offset x & y of pointer from element top left corner
 * 2. onPointerMove, set position of element as mouse moves
 * 3. onPointerUp, stop recording drag
 */

interface Position {
  x: number;
  y: number;
}

const DragAndDropPage = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const offset = useRef<Position>({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const onPointerDown = useCallback(
    (event: PointerEvent) => {
      isDragging.current = true;

      event.currentTarget.setPointerCapture(event.pointerId);

      offset.current = {
        x: event.clientX - pos.x,
        y: event.clientY - pos.y,
      };
    },
    [pos]
  );

  const onPointerMove = useCallback((event: PointerEvent) => {
    if (!isDragging.current) return;
    setPos({
      x: event.clientX - offset.current.x,
      y: event.clientY - offset.current.y,
    });
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <>
      <div className="min-h-screen min-w-screen">
        <h1 className="mt-5 text-center text-xl font-bold">
          Welcome to the Drag and Drop page!
        </h1>
        <main className="mx-5 mt-5 min-h-50 rounded-lg border-2 border-black p-2 relative">
          <div
            ref={ref}
            className="absolute size-15 bg-black"
            style={{
              left: pos.x,
              top: pos.y,
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          ></div>
        </main>
      </div>
    </>
  );
};

export { DragAndDropPage };
