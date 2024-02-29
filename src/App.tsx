import React from 'react';

import { Tree } from './Components/Tree/Tree.tsx';

import { ReactComponent as Logo } from './Icons/ft-logo.svg';

import styles from './App.module.css'


import './App.css';

const App = () => {
  return (
    <div className="App">
      <div className={styles['logo-wrapper']}></div>
      <Logo />
      {/* TODO: add searching input */}
      {/* <Tree /> */}
    </div>
  );
}

export default App;
