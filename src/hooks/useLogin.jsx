import { useState, useEffect } from 'react';
import axios from 'axios';

const useLogin = () => {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [errorMessage, setErrorMessage] = useState(true)

    const handleInputId = (e) => {
        setInputId(e.target.value)
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    const onClickLogin = () => {
        axios.post("http://127.0.0.1:8000/accounts/login/"
        ,{
            classnetid : inputId,
            classnetpw : inputPw
        }
        )
        .then(res => {
            console.log(res.data)
            localStorage.clear()
            localStorage.setItem('id', res.data.id)
            localStorage.setItem('token', res.data.token)
            window.location.replace('http://localhost:3000/main')
        })
        .catch((err) => {
            console.log(err)
            setErrorMessage(false)
        })
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onClickLogin();
        }
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
          window.location.replace('http://localhost:3000/main')
        }
    }, []);

    return {
        inputId, inputPw, errorMessage, 
        handleInputId, handleInputPw, 
        onClickLogin, 
        handleKeyPress, 
        show, handleClose, handleShow
    };
}

export default useLogin;