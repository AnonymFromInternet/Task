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

  useEffect(() => {
    apiService
      .getData()
      .then(response => {
        const items = response?.items
        Array.isArray(items) && setItems(items)
      })
      .catch()
      .finally(() => setIsDataLoading(false))
  }, [])

  return (
    <>
      <header className={styles['header']}>
        <Logo className={styles['logo']} />

        <Input />
      </header>

      <Tree />
    </>
  );
}

export default App;