import React, { useContext } from "react"
import { DataContext } from "../../Store/Store.ts";

import styles from './Items.module.css'


export const Items = () => {
    const { itemsAsJSX } = useContext(DataContext)

    console.log("itemsAsJSX :", itemsAsJSX);
    

    return (
        <div className={styles['wrapper']}>
            {itemsAsJSX}
        </div>
    )
}