import { useEffect, useMemo, useState } from "react"
import { Item as ItemInterface } from "../../../Types/Response.interface.ts"
import apiService from "../../../Services/GetData/GetData.service.ts"
import { DATA_TYPE_FOLDER } from "../../../GlobalHelpers/GlobalHelpers.ts"
import { getFlattenedItems } from "../Helpers/Helpers.ts"
import { FlattenedItem } from "../Types/Types.ts"

export const useData = () => {
    const [isDataLoading, setIsDataLoading] = useState<Boolean>(false)
    const [items, setItems] = useState<ItemInterface[]>([])
    const [error, setError] = useState<string>('')
    const [chosenSearchableElementId, setChosenSearchableElementId] = useState<string>('')
    const [findedElements, setFindedElements] = useState<ItemInterface[]>([])

    console.log("items :", items);
    

    useEffect(() => {
        setIsDataLoading(true)

        apiService
            .getData()
            .then(response => {
                const items = response?.items

                if (Array.isArray(items)) {
                    const flattenedItems = items.reduce((accumulator: Array<FlattenedItem>, currentItem: ItemInterface) => {
                        const { id, name, type, description } = currentItem
                        const hasChildren = !!(currentItem?.content && currentItem.content.length > 0)

                        accumulator.push({ id, name, type, description, hasChildren, hasParent: false })

                        if (currentItem.type === DATA_TYPE_FOLDER && hasChildren) {
                            getFlattenedItems(currentItem.content!, accumulator, true)
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
    }
}