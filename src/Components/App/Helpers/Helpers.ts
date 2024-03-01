import { DATA_TYPE_FOLDER } from "../../../GlobalHelpers/GlobalHelpers.ts"
import { Item } from "../../../Types/Response.interface"
import { FlattenedItem } from "../Types/Types.ts"

export const getFindedElements = (allItems: Item[], inputValue: string) => {
    return allItems.filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()))
}

export const ENTER_KEY = 'Enter'

export const getFlattenedItems = (items: Item[], accumulator: FlattenedItem[], hasParent: boolean) => {
    for (let index = 0; index < items.length; index++) {
        const element = items[index];
        const { id, name, type, description } = element
        const hasChildren = !!(element?.content && element.content.length > 0)

        accumulator.push({ id, name, type, description, hasChildren, hasParent })

        if (element.type === DATA_TYPE_FOLDER && hasChildren) {
            getFlattenedItems(element.content!, accumulator, true)
        }
    }
}

