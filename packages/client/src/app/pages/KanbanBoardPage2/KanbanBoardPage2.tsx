import { Fragment, useState, type DragEventHandler } from 'react';
import type { Item, Section } from './data.ts';
import { data } from './data.ts';

type DropAreaProps = { onDropHandler: DragEventHandler };
const DropArea = ({ onDropHandler }: DropAreaProps) => {
  return (
    <li
      className="flex h-10 w-full items-center justify-center rounded-sm border border-black"
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDropHandler}
    >
      Drop Area
    </li>
  );
};

type ItemProps = {
  item: Item;
  onDragStartHandler: DragEventHandler;
  onDragEndHandler: DragEventHandler;
};
const Item = ({ item, onDragStartHandler, onDragEndHandler }: ItemProps) => {
  return (
    <li
      className="border border-black px-2 py-1 select-none"
      onDragStart={onDragStartHandler}
      onDragEnd={onDragEndHandler}
      draggable
    >
      {item.id} : {item.name}
    </li>
  );
};

type BoardProps = { data: Section[] };
const Board = ({ data }: BoardProps) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleMoveItem = (
    sectionId: Section['id'],
    order: Item['order']
  ) => {
    if (!activeItem) return;
    // insert code here: if order + section are the same, do not move
    console.log(
      `moving [item ${activeItem}] to [section ${sectionId} - order ${Number(order) + 1}]`
    );
  };

  return (
    <>
      <ol className="flex w-full items-center justify-center gap-6 border border-black p-2">
        {/* Sections */}
        {data &&
          data.map((section) => (
            <li
              className="border-blue min-h-50 min-w-50 border"
              key={section.id}
            >
              <h3 className="text-center">
                {section.id} : {section.name}
              </h3>
              <ol className="flex flex-col gap-2 p-2">
                {/* items */}
                {section.items.map((item: Item) => (
                  <Fragment key={item.id}>
                    <Item
                      item={item}
                      onDragStartHandler={() => setActiveItem(item.id)}
                      onDragEndHandler={() => setActiveItem(null)}
                    />
                    <DropArea
                      onDropHandler={() =>
                        handleMoveItem(section.id, item.order)
                      }
                    />
                  </Fragment>
                ))}
              </ol>
            </li>
          ))}
      </ol>
      <h1>Active item: - {activeItem}</h1>
    </>
  );
};

const KanbanBoardPage2 = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <h1 className="mt-5 text-center text-xl font-bold">
        Welcome to the Kanban Board Page 2!
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

export { KanbanBoardPage2 };
