import React, { useEffect, useState } from 'react';

import { Input } from '../../UI/Input/Input.tsx';
import { Tree } from '../Tree/Tree.tsx';
import apiService from '../../Services/GetData/GetData.service.ts';
import { Item } from '../../Types/Response.interface.ts';

import { ReactComponent as Logo } from '../../Icons/ft-logo.svg'

import styles from './App.module.css'

const App = () => {
  const [isDataLoading, setIsDataLoading] = useState<Boolean>(false)
  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState<string>('')
  const [chosenSearchableElementId, setChosenSearchableElementId] = useState<string>('')

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

  return (
    <div className={styles['wrapper']}>
      <header className={styles['header']}>
        <Logo className={styles['logo']} onClick={goToFortTelecomSite} />

        <Input handleOnChange={setChosenSearchableElementId} />
      </header>
      <Tree isDataLoading={isDataLoading} items={items} chosenSearchableElementId={chosenSearchableElementId} error={error} />
    </div>
  );
}

export default App;