import React, { useEffect, useMemo, useState } from "react"
import { Item as ItemInterface } from "../../../Types/Response.interface.ts"
import apiService from "../../../Services/GetData/GetData.service.ts"
import { DATA_TYPE_FOLDER, GROUP_CLOSED, GROUP_OPENED, GROUP_WAS_CLOSED, GROUP_WAS_OPENED } from "../../../GlobalHelpers/GlobalHelpers.ts"
import { MAX_ITEM_WIDTH, NEXT_CHILD_SIZE_DIFF, getFlattenedItems } from "../Helpers/Helpers.ts"
import { FlattenedItem } from "../Types/Types.ts"
import { Item } from "../../Item/Item.tsx"

export const useData = () => {
    const [isDataLoading, setIsDataLoading] = useState<Boolean>(false)
    const [items, setItems] = useState<FlattenedItem[]>([])
    const [error, setError] = useState<string>('')
    const [chosenSearchableElementId, setChosenSearchableElementId] = useState<string>('')
    const [findedElements, setFindedElements] = useState<ItemInterface[]>([])
    const [scrollValue, setScrollValue] = useState<number>(0)

    const [filteredItemsWithOpenedAndClosedGroups, setFilteredItemsWithOpenedAndClosedGroups] = useState<FlattenedItem[]>([])
    const [groupsStatus, setGroupsStatus] = useState<Record<string, any>>({})

    const moveChosenSearchableElement = () => {
        const value = window.scrollY

        if (value >= 275) {
            setScrollValue(value - 275)
        }
    }

    const itemsAsJSX = useMemo(() => {
        return items.map(item => {
            return <Item key={item.id} item={item} width={item.width} hasChildren={item.hasChildren} />
        })
    }, [items])

    const toggleOpenCloseGroup = (id: string, prevState: 'opened' | 'closed') => {
        if (prevState === GROUP_WAS_OPENED) {
            console.log("IF");
            console.log("groupsStatus :", groupsStatus);
            
            
            setGroupsStatus(prevState => ({ ...prevState, [id]: GROUP_CLOSED }))
            const group = items.find(item => item.id === id)
            console.log("group :", group);

            const isUpperGroup = !group?.parentId
            if (isUpperGroup) {
                setFilteredItemsWithOpenedAndClosedGroups(items.filter(item => item.groupId !== id))
            }
        }

        if (prevState === GROUP_WAS_CLOSED) {
            setGroupsStatus(prevState => ({ ...prevState, [id]: GROUP_OPENED }))
        }
    }

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

    const getItems = () => {
        const items = []
        for (let key in groupsStatus) {
            console.log("key :", key);
        }
    }

    getItems()

    return {
        isDataLoading,
        items,
        error,
        chosenSearchableElementId,
        findedElements,
        itemsAsJSX,
        scrollValue,

        moveChosenSearchableElement,
        setFindedElements,
        setChosenSearchableElementId,
        goToFortTelecomSite,
        toggleOpenCloseGroup,
    }
}