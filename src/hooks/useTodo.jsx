import { useState, useEffect } from 'react';
import axios from 'axios';

const useTodo = () => {

    const [inputTodo, setInputTodo] = useState('')
    const [todoList, setTodoList] = useState([])

    const handleTodo= (e) => {
        setInputTodo(e.target.value)
    }

    const onClickSubmit = () => {
        axios.post("/todo",
            {
                user_id : localStorage.getItem('id'),
                description : inputTodo,
            }
        ).then((response) => {
            console.log(response);
            setInputTodo("")
            axios.get(`/todo/${localStorage.getItem('id')}`)
            .then((res)=> {
                console.log(res);
                setTodoList(res.data)
            })
        }
        ).catch()
        setInputTodo("");
    }
    
    useEffect(() => {
        axios.get(`/todo/${localStorage.getItem('id')}`
        ).then((response)=> {
            setTodoList(response.data)
        }).catch()
    }, []);

    return {inputTodo, todoList, setTodoList, handleTodo, onClickSubmit};
}

export default useTodo;