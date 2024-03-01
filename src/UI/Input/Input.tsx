import React, { useState } from "react"

import styles from './Input.module.css'

export const Input = () => {
    const [inputValue, setInputValue] = useState('')

    console.log("inputValue :", inputValue);
    

    return (
        <div className={styles['input']}>
            <input type="text" placeholder='Введите название папки или файла' value={inputValue} onChange={e => setInputValue(e.currentTarget.value)} />
        </div>
    )
}