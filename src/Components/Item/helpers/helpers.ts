import { Item } from "../../../Types/Response.interface";
import { FlattenedItem } from "../../App/Types/Types";

export const refreshCurrentSearchableElement = (items: FlattenedItem[], currentItem: Item, chosenSearchableElementId: string, setChosenSearchableElementId: (id: string) => void) => {
    const { groupId: currentItemGroupId } = items.find(item => item.id === currentItem.id) || {}
    const { groupId: chosenSearchableElementGroupId } = items.find(item => item.id === chosenSearchableElementId) || {}

    currentItem.id !== chosenSearchableElementId &&
        currentItem.id !== chosenSearchableElementId &&
        currentItemGroupId === chosenSearchableElementGroupId &&
        setChosenSearchableElementId('')
}