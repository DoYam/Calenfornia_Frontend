import React, {  } from 'react';
import style from './main.module.css';
import { useEffect } from 'react';
import MainRightScreen from './main_right';
import MainListScreen from './main_left';

function Main() {

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      window.location.replace('http://localhost:3000/')
    }
  }, []);

    return (
      <div className={style.page}>
        <MainListScreen/>
        <MainRightScreen/>
      </div>
    );
}

export default Main;