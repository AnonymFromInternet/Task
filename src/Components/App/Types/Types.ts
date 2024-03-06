import { Item } from "../../../Types/Response.interface";

export interface FlattenedItem extends Item {
     hasChildren: boolean,
     groupId: string,
     parentId: string,
     width: number,
}

type groupIndex = number
type groupElementsStatus = boolean
export type GroupsStatus = Record<groupIndex, groupElementsStatus>

type groupId = string
type groupIdCheckedValue = boolean
export type CheckboxesStatus = Record<groupId, groupIdCheckedValue>