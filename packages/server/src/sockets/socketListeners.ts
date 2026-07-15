import type { Socket } from 'socket.io';
import type { Section, Item } from '@prisma/client';
import { generateKeyBetween } from 'fractional-indexing';
import * as itemQueries from '@/features/boards/item.queries.js';

const handleMoveItem = async (
    socket: Socket,
    sectionId: Section['id'],
    itemId: Item['id'],
    orderAfter: Item['order']
) => {
    try {
        // generate order index
        const items = await itemQueries.getItemsBySection(sectionId);
        // if order invalid, generate as last place
        let order = '';
        if (items.length > 0) {
            // insert beginning of list
            if (orderAfter === null) {
                order = generateKeyBetween(null, items[0]?.order);
            }
            // insert at end of list
            else if (orderAfter == items.at(-1)?.order) {
                order = generateKeyBetween(items.at(-1)?.order, null);
            }
            // insert middle of list
            else {
                let insertAfterIndex = items
                    .map((item) => item.order)
                    .indexOf(orderAfter);
                order = generateKeyBetween(
                    items[insertAfterIndex]?.order,
                    items[insertAfterIndex + 1]?.order
                );
            }
        } else {
            // insert to empty list
            order = generateKeyBetween(null, null);
        }

        // execute moving item
        const data = await itemQueries.moveItem(sectionId, itemId, order);

        // broadcast change to everyone
        socket.emit('board:item-moved', data);
    } catch (error) {
        return console.log(error)
    }
};

export { handleMoveItem }