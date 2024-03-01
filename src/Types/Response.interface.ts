export interface Item {
    id: string,
    name: string,
    type: string,
    description: string,

    content?: Array<Item>,
}

export interface ResponseInterface {
    items: Array<Item>,
}

