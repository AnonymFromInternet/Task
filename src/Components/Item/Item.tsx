import React, { useContext, useState } from "react"
import { Item as ItemInterface } from "../../Types/Response.interface"
import { DATA_TYPE_FILE, DATA_TYPE_FOLDER, GROUP_WAS_CLOSED, GROUP_WAS_OPENED } from "../../GlobalHelpers/GlobalHelpers.ts"
import classNames from "classnames"
import { DataContext } from "../../Store/Store.ts"

import { ReactComponent as Arrow } from '../../Icons/arrow-down.svg'

import styles from './Item.module.css'
import { refreshCurrentSearchableElement } from "./helpers/helpers.ts"

interface ItemProps {
    item: ItemInterface,
    width: number,
    hasChildren: boolean,
}

export const Item = ({ item, width, hasChildren }: ItemProps) => {
    const { setChosenSearchableElementId, chosenSearchableElementId, toggleOpenCloseGroup, items } = useContext(DataContext)
    const [isClosed, setIsClosed] = useState(false)

    const handleGroupOpenClose = () => {
        toggleOpenCloseGroup(item.id, isClosed ? GROUP_WAS_CLOSED : GROUP_WAS_OPENED)
        setIsClosed(prevState => !prevState)
        refreshCurrentSearchableElement(items, item, chosenSearchableElementId, setChosenSearchableElementId)
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
            </div>
        </div>
    )
}