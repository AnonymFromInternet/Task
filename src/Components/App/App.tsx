import React from 'react';

import { Input } from '../../UI/Input/Input.tsx';
import { Tree } from '../Tree/Tree.tsx';
import { ENTER_KEY, getFindedElements } from './Helpers/Helpers.ts';
import classNames from 'classnames';
import { useData } from './Hooks/useData.tsx';
import { DataContext } from '../../Store/Store.ts';

import { ReactComponent as Logo } from '../../Icons/ft-logo.svg'

import styles from './App.module.css'

const App = () => {
  const {
    isDataLoading,
    items,
    error,
    chosenSearchableElementId,
    findedElements,
    setFindedElements,
    setChosenSearchableElementId,
    goToFortTelecomSite,
    itemsAsJSX,
  } = useData()

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
        nextItemId = findedElements?.[0]?.id
      }

      setChosenSearchableElementId(nextItemId)

      const currentActiveElementNode = document.getElementById(nextItemId)
      currentActiveElementNode?.scrollIntoView({ block: 'nearest' })
    }
  }

  return (
    <DataContext.Provider value={{ findedElements, itemsAsJSX }}>
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
    </DataContext.Provider>
  );
}

export default App;