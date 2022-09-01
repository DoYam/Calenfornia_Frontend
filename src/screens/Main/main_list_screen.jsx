import React, {  } from 'react';
import style from './main.module.css';
import { useCallback, useState, useRef, useEffect } from 'react';
import SelectSubject from './MainLeft/select_subject';
import Todo from './MainLeft/todo.jsx';

function MainListScreen () {
    const [boxId, setBoxId] = useState(0);
    const [visible, setVisible] = useState(false);

    return(
        <div className={style.listScreen}>
          <div className={style.logo}>
            Calenfornia
          </div>
          <div className={style.listSlide}>
            <div id="subjectbox" className={boxId === 1 && visible ? style.listBox_subject : style.listBox}>
              <SelectSubject/>
              {
                boxId === 1 && visible ?
                <button className={style.button}
                  onClick={() => {
                    setBoxId(1);
                    setVisible(!visible);
                }}>
                접어 두기
                </button>
                :
                <button className={style.button}
                  onClick={() => {
                    setBoxId(1);
                    setVisible(!visible);
                }}>
                  펼쳐 보기
                </button>
              }
            </div>
            <div id="todobox" className={boxId === 2 && visible ? style.listBox_myTodo : style.listBox}>
              <Todo/>
              {
                boxId === 2 && visible ?
                <button className={style.button}
                  onClick={() => {
                    setBoxId(2);
                    setVisible(!visible);
                }}>
                접어 두기
                </button>
                :
                <button className={style.button}
                  onClick={() => {
                    setBoxId(2);
                    setVisible(!visible);
                }}>
                  펼쳐 보기
                </button>
              }
            </div>
          </div>
        </div>
    );
}

export default MainListScreen;