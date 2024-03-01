import { Item } from "../../../Types/Response.interface";

export interface FlattenedItem extends Item {
     hasChildren: boolean,
     groupId: string,
     parentId: string,
     width: number,
}