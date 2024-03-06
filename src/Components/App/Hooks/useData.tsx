import React, { useEffect, useMemo, useState } from "react"
import { Item as ItemInterface } from "../../../Types/Response.interface.ts"
import apiService from "../../../Services/GetData/GetData.service.ts"
import { DATA_TYPE_FOLDER, GROUP_WAS_OPENED } from "../../../GlobalHelpers/GlobalHelpers.ts"
import { MAX_ITEM_WIDTH, NEXT_CHILD_SIZE_DIFF, getFlattenedItems } from "../Helpers/Helpers.ts"
import { CheckboxesStatus, FlattenedItem, GroupsStatus } from "../Types/Types.ts"
import { Item } from "../../Item/Item.tsx"

export const useData = () => {
    const [isDataLoading, setIsDataLoading] = useState<Boolean>(false)
    const [items, setItems] = useState<FlattenedItem[]>([])
    const [error, setError] = useState<string>('')
    const [chosenSearchableElementId, setChosenSearchableElementId] = useState<string>('')
    const [findedElements, setFindedElements] = useState<ItemInterface[]>([])
    const [scrollValue, setScrollValue] = useState<number>(0)
    const [groupsStatus, setGroupsStatus] = useState<GroupsStatus>({})
    const [checkboxesStatus, setCheckboxesStatus] = useState<CheckboxesStatus>({})

    const moveChosenSearchableElement = () => {
        const value = window.scrollY

        if (value >= 275) {
            setScrollValue(value - 275)
        }
    }

    const getFilteredItems = () => {
        return items.filter((item, index) => {
            return groupsStatus[index] === undefined || groupsStatus[index]
        })
    }    

    const itemsAsJSX = useMemo(() => {
        return getFilteredItems().map(item => {
            return <Item key={item.id} item={item} width={item.width} hasChildren={item.hasChildren} groupId={item.groupId} parentId={item.parentId} />
        })
    }, [getFilteredItems()])


    const toggleOpenCloseGroup = (id: string, prevState: 'opened' | 'closed') => {
        const newGroupsStatus = items.reduce((accumulator, currentItem, index) => {
            const opened = true
            const closed = false
            const status = prevState === GROUP_WAS_OPENED ? closed : opened

            if (currentItem.id === id) {
                const { parentId } = items.find(item => item.id === id) || {}
                const getItem = (item: FlattenedItem) => parentId ? currentItem.groupId && item.parentId === id : item.groupId === currentItem.groupId
                const lastIndex = items.findLastIndex((item: FlattenedItem) => getItem(item))

                for (let i = index + 1; i < lastIndex + 1; i++) {
                    accumulator[i] = status
                }
            }

            return accumulator
        }, {})

        setGroupsStatus(newGroupsStatus)
    }

    const toggleGroupsCheckbox = () => {

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

                        accumulator.push({ id, name, type, description, hasChildren, groupId: content && content.length > 0 ? id : '', parentId: '', width: MAX_ITEM_WIDTH })

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
        items: getFilteredItems(),
        error,
        chosenSearchableElementId,
        findedElements,
        itemsAsJSX,
        scrollValue,
        checkboxesStatus,

        moveChosenSearchableElement,
        setFindedElements,
        setChosenSearchableElementId,
        goToFortTelecomSite,
        toggleOpenCloseGroup,
        setCheckboxesStatus,
    }
}