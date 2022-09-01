import React, { useState, useEffect } from 'react';
import style from '../../screens/Main/main.module.css';
import styled from './todo.module.css';
import axios from 'axios';
import Todo from './todo';

function TodoList(){
    const [inputTodo, setInputTodo] = useState('')
    const [todoList, setTodoList] = useState([])

    const handleTodo= (e) => {
        setInputTodo(e.target.value)
    }

    const onClickSubmit = () => {
        axios.post("http://127.0.0.1:8000/todo/",
            {
                user_id : localStorage.getItem('id'),
                description : inputTodo,
            }
        ).then((response) => {
            console.log(response);
            setInputTodo("")
            axios.get(`http://127.0.0.1:8000/todo/${localStorage.getItem('id')}/`)
            .then((res)=> {
                console.log(res);
                setTodoList(res.data)
            })
        }
        ).catch()
        setInputTodo("");
    }
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/todo/${localStorage.getItem('id')}/`
        ).then((response)=> {
            setTodoList(response.data)
        }).catch()
    }, []);

    return (
        <>
            <div className={style.boxHeader}>내 할 일</div>
            <div className = {styled.form}>
                <input 
                    className={styled.inputStyle}
                    value={inputTodo}
                    onChange={handleTodo}
                />
                <button className={styled.button} onClick={onClickSubmit}>+</button>
            </div>
            <div style={{height : '55%', overflow : 'scroll', paddingBottom : '40px'}}>
                { 
                    todoList.map(function(todo){
                        return (
                            <div className={styled.todo} key={todo.id}>
                                <Todo 
                                    todo_id={todo.id} 
                                    description={todo.description} 
                                    complete={todo.complete} 
                                    key={todo.complete} 
                                    setTodo={setTodoList}
                                />
                            </div>
                        );
                    }) 
                }
            </div>
        </>
    );
}

export default TodoList;