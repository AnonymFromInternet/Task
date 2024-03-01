import { useEffect, useState } from "react"
import { Item } from "../../../Types/Response.interface.ts"
import apiService from "../../../Services/GetData/GetData.service.ts"

export const useData = () => {
    const [isDataLoading, setIsDataLoading] = useState<Boolean>(false)
    const [items, setItems] = useState<Item[]>([])
    const [error, setError] = useState<string>('')
    const [chosenSearchableElementId, setChosenSearchableElementId] = useState<string>('')
    const [findedElements, setFindedElements] = useState<Item[]>([])

    useEffect(() => {
        setIsDataLoading(true)

        apiService
            .getData()
            .then(response => {
                const items = response?.items
                Array.isArray(items) && setItems(items)
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