import { ReactElement, useEffect, useMemo, useState } from "react"
import { Item as ItemInterface } from "../../../Types/Response.interface.ts"
import apiService from "../../../Services/GetData/GetData.service.ts"
import React from "react"
import { Item } from "../../Item/Item.tsx"

export const useData = () => {
    const [isDataLoading, setIsDataLoading] = useState<Boolean>(false)
    const [items, setItems] = useState<ItemInterface[]>([])
    const [error, setError] = useState<string>('')
    const [chosenSearchableElementId, setChosenSearchableElementId] = useState<string>('')
    const [findedElements, setFindedElements] = useState<ItemInterface[]>([])

    const itemsAsJSX = useMemo(() => {
        return items.map(item => {
            return <Item item={item} />
        })
        
    }, [items.length > 0 && items])


    useEffect(() => {
        setIsDataLoading(true)

        apiService
            .getData()
            .then(response => {
                const items = response?.items
                if (Array.isArray(items)) {
                    setItems(items)
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