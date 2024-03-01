import React from "react"

import { ChosenSearchableElement } from "../ChosenSearchableElement/ChosenSearchableElement.tsx"
import { Item } from "../../Types/Response.interface.ts"
import { Loader } from "../../UI/Loader/Loader.tsx"
import { Error } from "../../UI/Error/Error.tsx"

import styles from './Tree.module.css'

interface TreeProps {
    isDataLoading: Boolean,
    items: Item[],
    chosenSearchableElementId: string,
    error: string,
}

export const Tree = ({ isDataLoading, items, chosenSearchableElementId, error }: TreeProps) => {
    return (
        <>
            <div className={styles['wrapper']} >
                {error && <Error />}

                {isDataLoading && <Loader />}

                {!error && !isDataLoading && items.length > 0 && <div className={styles['elements-wrapper']}>elements wrapper</div>}

                {chosenSearchableElementId && <ChosenSearchableElement />}
            </div>
        </>
    )
}