export interface Item {
    id: string,
    name: string,
    type: 'file' | 'folder',
    description: string,

    content?: Array<Item>,
}

export interface ResponseInterface {
    items: Array<Item>,
}

export interface Context {
    findedElements: Array<Item>,
}
