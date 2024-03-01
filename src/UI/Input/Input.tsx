import React, { useState } from "react"

import styles from './Input.module.css'

interface InputProps {
    handleOnChange: (value: string) => void,
    handleOnKeyDown: (value: string) => void,
}

export const Input = 
    ({ handleOnChange, handleOnKeyDown }: InputProps) => {
        const [inputValue, setInputValue] = useState('')

        const onChange = (value: string) => {
            setInputValue(value)
            handleOnChange(value)
        }

        return (
            <div className={styles['input']}>
                <input onKeyDown={e => handleOnKeyDown(e.key)} type="text" placeholder='Введите название папки или файла' value={inputValue} onChange={event => onChange(event.currentTarget.value)} />
            </div>
        )
    }