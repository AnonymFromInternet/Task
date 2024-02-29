import React from "react"

import styles from './Input.module.css'

export const Input = () => {
    return (
        <div className={styles['input']}>
            <input type="text" placeholder='Введите название папки или файла' />
        </div>
    )
}