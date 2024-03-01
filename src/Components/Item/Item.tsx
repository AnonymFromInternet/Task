import React from "react"
import { Item as ItemInterface } from "../../Types/Response.interface"

import styles from './Item.module.css'

interface ItemProps {
    item: ItemInterface
}

export const Item = ({item}: ItemProps) => {
    return <div className={styles['wrapper']}>{item.name}</div>
}