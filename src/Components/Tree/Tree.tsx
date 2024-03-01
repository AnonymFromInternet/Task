import React from "react"

import { ChosenSearchableElement } from "../ChosenSearchableElement/ChosenSearchableElement.tsx"
import { Item } from "../../Types/Response.interface.ts"
import { ReactComponent as Loader } from "../../Icons/loader.svg"
import { Error } from "../../UI/Error/Error.tsx"
import { Items } from "../Items/Items.tsx"

import styles from './Tree.module.css'

interface TreeProps {
    isDataLoading: Boolean,
    items: Item[],
    chosenSearchableElementId: string,
    error: string,
}

export const Tree = ({ isDataLoading, items, chosenSearchableElementId, error }: TreeProps) => {
    return (
        <div className={styles['wrapper']} >
            {error && <Error />}

            {isDataLoading && <Loader className={styles['loader']} />}

            {!error && !isDataLoading && items.length > 0 && <Items />}

            {chosenSearchableElementId && <ChosenSearchableElement key={chosenSearchableElementId} id={chosenSearchableElementId} />}
        </div>
    )
}