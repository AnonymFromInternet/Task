import React from "react"
import { Item as ItemInterface } from "../../Types/Response.interface"
import { DATA_TYPE_FILE } from "../../GlobalHelpers/GlobalHelpers.ts"

import styles from './Item.module.css'

interface ItemProps {
    item: ItemInterface,
}

export const Item = ({ item }: ItemProps) => {
    return (
        <div className={styles['wrapper']}>
            {item.type === DATA_TYPE_FILE ? <div className={styles['type-file']} /> : <div className={styles['type-folder']} />}

            <div className={styles['name']}>
                {item.name}
            </div>
        </div>
    )
}