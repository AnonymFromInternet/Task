import React, { useEffect, useRef, useState } from 'react';

import { Input } from '../../UI/Input/Input.tsx';
import { Tree } from '../Tree/Tree.tsx';
import apiService from '../../Services/GetData/GetData.service.ts';
import { Item } from '../../Types/Response.interface.ts';
import { ENTER_KEY, getFindedElements } from './Helpers/Helpers.ts';
import classNames from 'classnames';

import { ReactComponent as Logo } from '../../Icons/ft-logo.svg'

import styles from './App.module.css'

const App = () => {
  // TODO: вынести все эти методы и данные в кастомный хук
  const [isDataLoading, setIsDataLoading] = useState<Boolean>(false)
  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState<string>('')
  const [chosenSearchableElementId, setChosenSearchableElementId] = useState<string>('')
  const [findedElements, setFindedElements] = useState<Item[]>([])

  console.log("chosenSearchableElementId :", chosenSearchableElementId);
  console.log("");

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
    if (!value) {
      setFindedElements([])
      setChosenSearchableElementId('')
      return
    }

    setFindedElements(getFindedElements(items, value))
  }

  const onHandleKeyDown = (value: string) => {
    if (value === ENTER_KEY) {
      let nextItemId: string;

      if (chosenSearchableElementId) {
        const currentItemElementIndex = findedElements.findIndex(item => item.id === chosenSearchableElementId)
        const nextElementIndex = currentItemElementIndex + 1 <= findedElements.length - 1 ? currentItemElementIndex + 1 : 0
        const nextItem = findedElements.find((_, index) => index === nextElementIndex)
        nextItemId = nextItem?.id || ''
      } else {
        nextItemId = findedElements?.[0].id
      }

      setChosenSearchableElementId(nextItemId)
    }
  }

  return (
    <div className={styles['wrapper']}>
      <header className={styles['header']}>
        <Logo className={styles['logo']} onClick={goToFortTelecomSite} />

        <div className={styles['input-and-finded-elements-wrapper']}>
          <Input handleOnChange={onHandleInputChange} handleOnKeyDown={onHandleKeyDown} />

          <label htmlFor="finded-elements-wrapper" className={styles['finded-elements-title']}>Найденные файлы или папки</label>
          <div id='finded-elements-wrapper' className={styles['finded-elements-wrapper']}>
            {findedElements.length > 0 && findedElements.map(element => (
              <div
                key={element.id}
                id={element.id}
                className={classNames({ [styles['finded-element']]: true, [styles['active-finded-element']]: element.id === chosenSearchableElementId })}>
                {element.name}
              </div>))}
          </div>
        </div>
      </header>
      <Tree isDataLoading={isDataLoading} items={items} chosenSearchableElementId={chosenSearchableElementId} error={error} />
    </div>
  );
}

export default App;