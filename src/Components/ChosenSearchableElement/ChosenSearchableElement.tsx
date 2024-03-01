import React, { useContext } from "react"

import classNames from "classnames"
import { DataContext } from "../../Store/Store.ts"
import { DATA_TYPE_FILE } from "../../GlobalHelpers/GlobalHelpers.ts"

import styles from './ChosenSearchableElement.module.css'

interface ChosenSearchableElementProps {
    id: string
}

export const ChosenSearchableElement = ({ id }: ChosenSearchableElementProps) => {
    const { findedElements } = useContext(DataContext)
    const { name, description, type } = findedElements.find(item => item.id === id) || {}

    console.log("{name, description, type} :", { name, description, type });


    return (
        <div key={id} className={classNames(styles['wrapper'], styles['render-animation'])}>
            {type === DATA_TYPE_FILE ? <div className={styles['type-file']} /> : <div className={styles['type-folder']} /> }
            <label htmlFor="description">{name}</label>
            <div id="description" className={styles['description']}></div>
        </div>
    )
}