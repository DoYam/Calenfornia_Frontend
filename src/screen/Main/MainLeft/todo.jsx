import React, { useState, useEffect } from 'react';
import style from '../main.module.css';
import styled from './todo.module.css';
import { Form } from 'react-bootstrap';
import axios from 'axios';

const CheckBox = (props) => {
    const todo_id = props.todo_id;
    const url = `http://127.0.0.1:8000/todo/${localStorage.getItem('id')}/${todo_id}/`;
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

    return (
        <>
            <input type="checkbox" onClick={onClickCheck} 
                checked={check}
                onChange={onChangeCheck}
            />
        </>
    );
}

function Todo(){
    const [inputTodo, setInputTodo] = useState('')
    const [todoList, setTodoList] = useState([])

    const handleTodo= (e) => {
        setInputTodo(e.target.value)
    }

    const onClickSubmit = (e) => {
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

    const onClickDelete = (e) => {
        console.log(e.target.value)
        axios.delete( `http://127.0.0.1:8000/todo/${localStorage.getItem('id')}/${e.target.value}/` ).then(() => {
            axios.get(`http://127.0.0.1:8000/todo/${localStorage.getItem('id')}/`
            ).then((response)=> {
                setTodoList(response.data)
            })
        }).catch()
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
            <Form className = {styled.form}>
                <Form.Group>
                    <Form.Control  
                        className={styled.inputStyle}
                        value={inputTodo}
                        onChange={handleTodo} 
                    ></Form.Control>
                </Form.Group>
                <button className={styled.button} onClick={onClickSubmit}>+</button>
            </Form>
            <div style={{height : '55%', overflow : 'scroll', paddingBottom : '25px'}}>
                { 
                    todoList.map(function(todo){
                        return (
                            <div className={styled.todo} key={todo.id}>
                                <CheckBox todo_id={todo.id} complete={todo.complete} key={todo.complete}/>
                                <div style={{width: '100%', }} key={todo.description}>
                                    <p style={{margin : 5, textAlign : 'left'}} key={todo.id}>{todo.description}</p>
                                </div>
                                
                                <button 
                                    value={todo.id} 
                                    key={todo.id} 
                                    onClick={onClickDelete}  
                                    style={{background: 'white', color : '#FFAB72', border: 'none', fontSize: '20px', fontFamily: 'initial'}}
                                >
                                    X
                                </button>
                            </div>
                        );
                    }) 
                }
            </div>
        </>
    );
}

export default Todo;