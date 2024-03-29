import { createContext } from 'react';
import { Context } from '../Types/Response.interface';

export const DataContext = createContext<Context>({
    findedElements: [],
    itemsAsJSX: [],
    setChosenSearchableElementId: (id: string) => {},
    chosenSearchableElementId: '',
    items: [],
    scrollValue: 0,
    toggleOpenCloseGroup: (id: string, prevState: 'opened' | 'closed') => {},
    checkboxesStatus: {},
    setCheckboxesStatus: () => {},
});