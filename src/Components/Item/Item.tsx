import React, { ChangeEvent, SyntheticEvent, useContext, useEffect, useState } from "react"
import { Item as ItemInterface } from "../../Types/Response.interface"
import { DATA_TYPE_FILE, DATA_TYPE_FOLDER, GROUP_WAS_CLOSED, GROUP_WAS_OPENED } from "../../GlobalHelpers/GlobalHelpers.ts"
import classNames from "classnames"
import { DataContext } from "../../Store/Store.ts"
import { refreshCurrentSearchableElement } from "./helpers/helpers.ts"

import { ReactComponent as Arrow } from '../../Icons/arrow-down.svg'

import styles from './Item.module.css'

interface ItemProps {
    item: ItemInterface,
    width: number,
    hasChildren: boolean,
    groupId: string,
    parentId: string
}

export const Item = ({ item, width, hasChildren, groupId, parentId }: ItemProps) => {
    const { setChosenSearchableElementId, chosenSearchableElementId, toggleOpenCloseGroup, items, checkboxesStatus, setCheckboxesStatus } = useContext(DataContext)
    const [isClosed, setIsClosed] = useState(false)
    const [checked, setChecked] = useState(false)   
    
    useEffect(() => {
        setChecked(checkboxesStatus[groupId])
    }, [checkboxesStatus])
    

    const handleGroupOpenClose = () => {
        toggleOpenCloseGroup(item.id, isClosed ? GROUP_WAS_CLOSED : GROUP_WAS_OPENED)
        setIsClosed(prevState => !prevState)
        refreshCurrentSearchableElement(items, item, chosenSearchableElementId, setChosenSearchableElementId)
    }

    const onChangeInpitValue = (e: ChangeEvent<HTMLInputElement>) => {       
        e.stopPropagation()
        setChecked(e.target.checked)

        if (groupId && !parentId) {
            setCheckboxesStatus({[groupId]: e.target.checked})
        }
    }
    
    return (
        <div className={styles['Wrapper']}>
            {
                hasChildren && (
                    <Arrow
                        className={classNames({
                            [styles['opened']]: true,
                            [styles['closed']]: isClosed,
                            [styles['arrow-type-file']]: item.type === DATA_TYPE_FILE,
                            [styles['arrow-type-folder']]: item.type === DATA_TYPE_FOLDER,
                        })}
                        onClick={handleGroupOpenClose}>
                    </Arrow>
                )}

            <div
                className={classNames({
                    [styles['wrapper']]: true,
                    [styles['wrapper-border-file-type']]: item.type === DATA_TYPE_FILE,
                    [styles['wrapper-border-folder-type']]: item.type === DATA_TYPE_FOLDER,
                    [styles['active-file']]: chosenSearchableElementId === item.id && item.type === DATA_TYPE_FILE,
                    [styles['active-folder']]: chosenSearchableElementId === item.id && item.type === DATA_TYPE_FOLDER,
                })}
                style={{ width: `${width}px` }}
                onClick={() => setChosenSearchableElementId(item.id)}
            >
                {item.type === DATA_TYPE_FILE ? <div className={styles['type-file']} /> : <div className={styles['type-folder']} />}

                <div className={styles['name']}>
                    {item.name}
                </div>

                <div className={styles['input-wrapper']}>
                    <input type="checkbox" onClick={e => e.stopPropagation()} onChange={onChangeInpitValue} checked={checked} />
                </div>
            </div>
        </div>
    )
}