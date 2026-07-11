type Item = { id: number; order: string; name: string };
type Section = { id: number; order: string; name: string; items: Item[] };

const data: Section[] = [
    {
        id: 100,
        order: '0', 
        name: 'section 1',
        items: [
            { id: 1, order: '0', name: 'hello' },
            { id: 2, order: '1', name: 'bye' },
            { id: 3, order: '2', name: 'swag' },
        ],
    },
    {
        id: 101,
        order: '1', 
        name: 'section 2',
        items: [
            { id: 4, order: '0', name: 'zoopy' },
            { id: 5, order: '1', name: 'zippy' },
            { id: 6, order: '2', name: 'zawpy' },
        ],
    },
    {
        id: 102,
        order: '2', 
        name: 'section 3',
        items: [],
    },
];

export type { Item, Section };
export { data };
