import React, { useEffect, useMemo, useState } from "react"
import { Item as ItemInterface } from "../../../Types/Response.interface.ts"
import apiService from "../../../Services/GetData/GetData.service.ts"
import { DATA_TYPE_FOLDER } from "../../../GlobalHelpers/GlobalHelpers.ts"
import { MAX_ITEM_WIDTH, NEXT_CHILD_SIZE_DIFF, getFlattenedItems } from "../Helpers/Helpers.ts"
import { FlattenedItem } from "../Types/Types.ts"
import { Item } from "../../Item/Item.tsx"

export const useData = () => {
    const [isDataLoading, setIsDataLoading] = useState<Boolean>(false)
    const [items, setItems] = useState<FlattenedItem[]>([])
    const [error, setError] = useState<string>('')
    const [chosenSearchableElementId, setChosenSearchableElementId] = useState<string>('')
    const [findedElements, setFindedElements] = useState<ItemInterface[]>([])

    const itemsAsJSX = useMemo(() => {
        return items.map(item => {
            return <Item key={item.id} item={item} width={item.width} />
        })
    }, [items])    

    console.log("items :", items);

    useEffect(() => {
        setIsDataLoading(true)

        apiService
            .getData()
            .then(response => {
                const items = response?.items

                if (Array.isArray(items)) {
                    const flattenedItems = items.reduce((accumulator: Array<FlattenedItem>, currentItem: ItemInterface) => {
                        const { id, name, type, description, content } = currentItem
                        const hasChildren = !!(content && content.length > 0)

                        accumulator.push({ id, name, type, description, hasChildren, groupId: '', parentId: '', width: MAX_ITEM_WIDTH })

                        if (currentItem.type === DATA_TYPE_FOLDER && hasChildren) {
                            getFlattenedItems(content!, accumulator, id, id, MAX_ITEM_WIDTH - NEXT_CHILD_SIZE_DIFF)
                        }

                        return accumulator
                    }, [])
                    setItems(flattenedItems)
                }
            })
            .catch(setError)
            .finally(() => setIsDataLoading(false))
    }, [])

    const goToFortTelecomSite = () => {
        window.location.href = 'https://www.fort-telecom.ru/'
    }

    return {
        isDataLoading,
        items,
        error,
        chosenSearchableElementId,
        findedElements,
        setFindedElements,
        setChosenSearchableElementId,
        goToFortTelecomSite,
        itemsAsJSX,
    }
}