import React from "react"

import { ChosenSearchableElement } from "../ChosenSearchableElement/ChosenSearchableElement.tsx"

import styles from './Tree.module.css'

export const Tree = () => {
    return <div className={styles['wrapper']} >
        <div className={styles['elements-wrapper']}>

        </div>

        <ChosenSearchableElement />
    </div>
}