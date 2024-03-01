import React from "react"
import { Item as ItemInterface } from "../../Types/Response.interface"
import { DATA_TYPE_FILE, DATA_TYPE_FOLDER } from "../../GlobalHelpers/GlobalHelpers.ts"
import classNames from "classnames"

import styles from './Item.module.css'

interface ItemProps {
    item: ItemInterface,
    width: number,
}

export const Item = ({ item, width }: ItemProps) => {
    console.log("width :", width);    
    
    return (
        <div className={classNames({
            [styles['wrapper']]: true,
            [styles['wrapper-border-file-type']]: item.type === DATA_TYPE_FILE,
            [styles['wrapper-border-folder-type']]: item.type === DATA_TYPE_FOLDER,
        })}
        style={{width: `${width}px`}}>
            {item.type === DATA_TYPE_FILE ? <div className={styles['type-file']} /> : <div className={styles['type-folder']} />}

            <div className={styles['name']}>
                {item.name}
            </div>
        </div>
    )
}