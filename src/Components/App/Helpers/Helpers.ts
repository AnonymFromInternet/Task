import { DATA_TYPE_FOLDER } from "../../../GlobalHelpers/GlobalHelpers.ts"
import { Item } from "../../../Types/Response.interface"
import { FlattenedItem } from "../Types/Types.ts"

export const getFindedElements = (allItems: Item[], inputValue: string) => {
    return allItems.filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()))
}

export const ENTER_KEY = 'Enter'
export const MAX_ITEM_WIDTH = 780
export const NEXT_CHILD_SIZE_DIFF = 100

export const getFlattenedItems = (items: Item[], accumulator: FlattenedItem[], groupId: string, parentId: string, parentWidth: number) => {
    for (let index = 0; index < items.length; index++) {
        const element = items[index];
        const { id, name, type, description } = element
        const hasChildren = !!(element?.content && element.content.length > 0)

        accumulator.push({ id, name, type, description, hasChildren, groupId, parentId, width: parentWidth })

        if (element.type === DATA_TYPE_FOLDER && hasChildren) {
            getFlattenedItems(element.content!, accumulator, groupId, element.id, parentWidth - NEXT_CHILD_SIZE_DIFF)
        }
    }
}

