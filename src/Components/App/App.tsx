import React from 'react';

import { ReactComponent as Logo } from '../../Icons/ft-logo.svg'

import styles from './App.module.css'

const App = () => {
  return (
    <div className="App">
      <header className={styles['header']}>
        <Logo className={styles['logo']} />

        <input type="text" className={styles['search-input']} placeholder='Введите название папки или файла' />
      </header>
    </div>
  );
}

export default App;