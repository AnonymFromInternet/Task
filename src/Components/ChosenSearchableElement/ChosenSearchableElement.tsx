import React, { useContext, useMemo } from "react"

import classNames from "classnames"
import { DataContext } from "../../Store/Store.ts"
import { DATA_TYPE_FILE } from "../../GlobalHelpers/GlobalHelpers.ts"

import styles from './ChosenSearchableElement.module.css'

interface ChosenSearchableElementProps {
    id: string
}

export const ChosenSearchableElement = ({ id }: ChosenSearchableElementProps) => {        
    const { findedElements, items: storeItems, scrollValue } = useContext(DataContext)
    const items = findedElements && findedElements.length > 0 ? findedElements : storeItems
    
    const { name, description, type } = useMemo(() => {
        return items.find(item => item.id === id) || { name: '', description: '', type: '' }
    }, [items])
    
    const style = {
        transform: `translate(0, ${scrollValue}px)`,
        transition: '.4s',
    }

    return (
        <div key={id} className={classNames(styles['wrapper'], styles['render-animation'])} style={style}>
            {type === DATA_TYPE_FILE ? <div className={styles['type-file']} /> : <div className={styles['type-folder']} />}

            <div className={styles['name-wrapper']}>
                <div className={styles['name']}>
                    {`Имя ${type === DATA_TYPE_FILE ? 'Файла' : 'Папки'}`}
                    <br /> <br /> {name}
                </div>
            </div>

            <div className={styles['description-wrapper']}>
                <div className={styles['description']}>
                    Описание <br/> <br /> { description }
                </div>
            </div>
        </div>
    )
}