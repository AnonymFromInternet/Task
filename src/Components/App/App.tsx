import React from 'react';

import { ReactComponent as Logo } from '../../Icons/ft-logo.svg'
import { Input } from '../../UI/Input/Input.tsx';

import styles from './App.module.css'

const App = () => {
  return (
    <div className="App">
      <header className={styles['header']}>
        <Logo className={styles['logo']} />

        <Input />
      </header>
    </div>
  );
}

export default App;