interface ServerToClientEvents {
    "board:item-moved": (payload: {
        itemId: string;
        sectionId: string;
        order: string;
    }) => void;
}
interface ClientToServerEvents {
    "board:move-item": (payload: {
        itemId: string;
        sectionId: string;
        orderAfter: string;
    }, callback: (response: {
        status: "ok";
    } | {
        status: "error";
        message: string;
    }) => void) => void;
}
declare const usagi: {
    chiikawa: string;
};
export type { ServerToClientEvents, ClientToServerEvents };
export { usagi };
//# sourceMappingURL=socketEvents.d.ts.map