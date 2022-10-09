import React from 'react';
import styled from './login.module.css';
import logo from '../../assets/icons/logo.svg';
import AuthInput from '../../components/Auth/input.jsx';
import SignUp from './signup_modal.jsx';
import useLogin from '../../hooks/useLogin';

function Login() {

    const {
        inputId, inputPw, errorMessage, 
        handleInputId, handleInputPw, 
        onClickLogin, 
        handleKeyPress, 
        show, handleClose, handleShow
    } = useLogin();

    return(
        <>
            <div className={styled.box}>
                <div style={{marginBottom: '30px',position : 'relative',}}>
                    <p className={styled.titleStyle}>Calenfornia</p>
                    <img src={logo} alt=""/>
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
                        처음 이용하신다면?<button className={styled.openModal} onClick={handleShow}> 홍익대학교 학생 인증 후 가입하기 </button>
                    </p>
                </div>
                <SignUp show={show} handleClose ={handleClose}/>
            </div>
        </>
    );
};

export default Login;