import React from 'react';
import style from '../../screens/Main/main.module.css';
import styled from './todo.module.css';
import Todo from './todo';
import useTodo from '../../hooks/useTodo';

function TodoList(){

    const {
        inputTodo, todoList, setTodoList, handleTodo, onClickSubmit
    } = useTodo();

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