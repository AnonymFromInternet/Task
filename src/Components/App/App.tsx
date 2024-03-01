import React, { useEffect, useState } from 'react';

import { Input } from '../../UI/Input/Input.tsx';
import { Tree } from '../Tree/Tree.tsx';
import apiService from '../../Services/GetData/GetData.service.ts';
import { Item } from '../../Types/Response.interface.ts';
import { getFindedElements } from './Helpers/Helpers.ts';

import { ReactComponent as Logo } from '../../Icons/ft-logo.svg'

import styles from './App.module.css'

const App = () => {
  // TODO: вынести все эти методы и данные в кастомный хук
  const [isDataLoading, setIsDataLoading] = useState<Boolean>(false)
  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState<string>('')
  const [chosenSearchableElementId, setChosenSearchableElementId] = useState<string>('')
  const [findedElements, setFindedElements] = useState<Item[]>([])

  useEffect(() => {
    setIsDataLoading(true)

    apiService
      .getData()
      .then(response => {
        const items = response?.items
        Array.isArray(items) && setItems(items)
      })
      .catch(setError)
      .finally(() => setIsDataLoading(false))
  }, [])

  const goToFortTelecomSite = () => {
    window.location.href = 'https://www.fort-telecom.ru/'
  }

  const onHandleInputChange = (value: string) => {
    setFindedElements(getFindedElements(items, value))

    if (!value) {
      setFindedElements([])
    }
  }

  return (
    <div className={styles['wrapper']}>
      <header className={styles['header']}>
        <Logo className={styles['logo']} onClick={goToFortTelecomSite} />

        <div className={styles['input-and-finded-elements-wrapper']}>
          <Input handleOnChange={onHandleInputChange} />

          <label htmlFor="finded-elements-wrapper" className={styles['finded-elements-title']}>Найденные файлы или папки при поиске</label>
          <div id='finded-elements-wrapper' className={styles['finded-elements-wrapper']}>
            {findedElements.length > 0 && findedElements.map(element => (<div key={element.id} className={styles['finded-element']}> {element.name} </div>))}
          </div>
        </div>
      </header>
      <Tree isDataLoading={isDataLoading} items={items} chosenSearchableElementId={chosenSearchableElementId} error={error} />
    </div>
  );
}

export default App;