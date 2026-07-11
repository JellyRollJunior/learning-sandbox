type Item = { id: number; name: string };
type Section = { id: number; name: string; items: Item[] };

const data: Section[] = [
    {
        id: 100,
        name: 'section 1',
        items: [
            { id: 1, name: 'hello' },
            { id: 2, name: 'bye' },
            { id: 3, name: 'swag' },
        ],
    },
    {
        id: 101,
        name: 'section 2',
        items: [
            { id: 4, name: 'zoopy' },
            { id: 5, name: 'zippy' },
            { id: 6, name: 'zawpy' },
        ],
    },
    {
        id: 102,
        name: 'section 3',
        items: [],
    },
];

export type { Item, Section };
export { data };
