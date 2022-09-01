import React, { useState, useEffect } from 'react';
import styled from './login.module.css';
import axios from 'axios';
import logo from '../../assets/icons/logo.svg';
import AuthInput from '../../components/Auth/input.jsx';
import SignUp from './signup_modal.jsx';

function Login() {
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

    return(
        <>
            <div className={styled.box}>
                <div style={{marginBottom: '30px',position : 'relative',}}>
                    <p className={styled.titleStyle}>Calenfornia</p>
                    <img src={logo}/>
                </div>
                <div onKeyDown={handleKeyPress} style={{width : '25vw', minWidth : '330px'}}>
                    <AuthInput 
                        classnet_id={inputId} 
                        classnet_pw = {inputPw} 
                        onChangeId={handleInputId} 
                        onChangePw={handleInputPw}
                    />
                    {
                        errorMessage ?
                        <p style={{ display: 'none', fontFamily : 'KyoboHand'}}>아이디와 비밀번호가 일치하지 않습니다. 다시 입력해주세요.</p>
                        :
                        <p style={{ color : "#FF0000", fontFamily : 'KyoboHand'}}>아이디와 비밀번호가 일치하지 않습니다. 다시 입력해주세요.</p>
                    }
                    <button 
                        disabled={inputId.length < 6 || inputPw.length < 6}
                        className={styled.loginButton}
                        onClick={onClickLogin}
                    >
                        Login
                    </button>
                    <p style={{fontFamily : 'KyoboHand'}}>
                        처음 이용하신다면? <label style={{color: 'blue', textDecoration: 'underline'}} onClick={handleShow}>
                            홍익대학교 학생 인증 후 가입하기
                        </label>
                    </p>
                </div>
                <SignUp show={show} handleClose ={handleClose}/>
            </div>
        </>
    );
};

export default Login;