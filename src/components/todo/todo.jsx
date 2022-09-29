import React, { useState } from 'react';
import styled from './todo.module.css';
import axios from 'axios';

const Todo = (props) => {
    const todo_id = props.todo_id;
    const url = `http://43.201.34.118:3306/todo/${localStorage.getItem('id')}/${todo_id}/`;
    const [check, setCheck] = useState(props.complete);
    
    const onClickCheck = () => {
        axios.patch(url,
        {
            complete : !check
        }
        ).then((response) => {
            setCheck(response.data.complete)
        }).catch((err) => {})
    }

    const onChangeCheck = (e) => {
        setCheck(e.target.checked)
    }

    const onClickDelete = (e) => {
        axios.delete(url).then(() => {
            axios.get(`http://43.201.34.118:3306/todo/${localStorage.getItem('id')}/`
            ).then((response)=> {
                props.setTodo(response.data)
            })
        }).catch()
    }

    return (
        <>
            <input type="checkbox" onClick={onClickCheck} 
                checked={check}
                onChange={onChangeCheck}
                className={check ? styled.checkedbox : styled.checkbox}
            />
            <div style={{width: '100%', }} key={props.description}>
                <p 
                    style={ 
                        !check 
                        ? {margin : 5, textAlign : 'left'} 
                        : {margin : 5, textAlign : 'left', color : '#D9D9D9', textDecoration : 'line-through'}
                    }
                >
                    {props.description}
                </p>
            </div>
            <button 
                key={todo_id} 
                onClick={onClickDelete}  
                className={styled.delete}
            >
                X
            </button>
        </>
    );
}

export default Todo;