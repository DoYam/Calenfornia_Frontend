import React, {  } from 'react';
import style from './main.module.css';
import { useState } from 'react';
import SelectSubject from '../../components/selectSubject/select_subject';
import TodoList from '../../components/todo/todoList.jsx';

function MainListScreen () {
  const [boxId, setBoxId] = useState(0);
  const [visible, setVisible] = useState(false);

  const ListButton = (props) => {
    return (
      <button className={style.listOpenButton}
        onClick={() => {
          setBoxId(props.listId);
          setVisible(!visible);
      }}>
        {
          boxId === props.listId && visible ?
          <p style={{margin : 'auto'}}>접어 두기</p> : <p style={{margin : 'auto'}}>펼쳐 보기</p>
        }
      </button>
    );
  }

  return(
      <div className={style.listScreen}>
        <div className={style.logo}>
          Calenfornia
        </div>
        <div className={style.listSlide}>
          <div className={boxId === 1 && visible ? style.listBoxClicked : style.listBox}>
            <SelectSubject/>
            <ListButton listId={1}/>
          </div>
          <div className={boxId === 2 && visible ? style.listBoxClicked : style.listBox}>
            <TodoList/>
            <ListButton listId={2}/>
          </div>
        </div>
      </div>
    );
}

export default MainListScreen;