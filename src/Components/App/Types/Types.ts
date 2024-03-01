import { Item } from "../../../Types/Response.interface";

export interface FlattenedItem extends Item {
     hasChildren: boolean,
     hasParent: boolean,
}