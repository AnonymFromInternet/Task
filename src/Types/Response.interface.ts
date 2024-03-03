import { ReactElement } from "react";
import { FlattenedItem } from "../Components/App/Types/Types";

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
    itemsAsJSX: ReactElement[],
    chosenSearchableElementId: string,
    items: Array<FlattenedItem>,
    scrollValue: number,

    setChosenSearchableElementId: (id: string) => void,
    toggleOpenCloseGroup: (id: string, prevState: 'opened' | 'closed') => void,
}
