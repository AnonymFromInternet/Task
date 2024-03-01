import { createContext } from 'react';
import { Context } from '../Types/Response.interface';

export const DataContext = createContext<Context>({findedElements: [], itemsAsJSX: []});