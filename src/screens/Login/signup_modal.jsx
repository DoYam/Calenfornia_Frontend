import React, { useState, } from 'react';
import styled from '../../screens/Login/login.module.css';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

const SignUp = (props) => {
    const [classnetId, setID] = useState('')
    const [classnetPw, setPw] = useState('')

    const [checkCertify, setCheck] = useState(false)
    const [errorMessage, setError] = useState(false)

    const [checkSignup, setSignup] = useState(true)

    const handleInputId = (e) => {
        setID(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setPw(e.target.value)
    }

    const onClickCertify = () => {
        axios.post("http://127.0.0.1:8000/accounts/classnet/", {
            classnetid : classnetId,
            classnetpw : classnetPw
        })
        .then(() => {
            axios.get("http://127.0.0.1:8000/accounts/classnet/").then(
                (res) => {
                    console.log(res)
                    setCheck(res.data.classnet)
                    setError(false)
                }
            )
        }).catch(() => {
            setError(true)
        })
    }

    // 회원가입시 rest api 통신할 내용
    const onClickSignUp = () => {
        axios.post("http://127.0.0.1:8000/accounts/signup/", {
            classnet : checkCertify,
            classnetid : classnetId,
            classnetpw : classnetPw,
        })
        .then(() => {
            axios.get("http://127.0.0.1:8000/accounts/signup/"
            ).then(function (res){
                console.log(res.data)
                setSignup(res.data.classnet)
                window.location.reload()
            })
        })
        .catch(() => {
            setSignup(false)
            setCheck(false)
        })
    }

    return(
        <>
        <Modal show={props.show} onHide={props.handleClose} style={{textAlign: 'center',}} centered>
            <Modal.Header closeButton>
                <Modal.Title>Calenfornia 가입하기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input 
                    className={styled.inputStyle}
                    disabled={checkCertify}
                    placeholder="클래스넷 아이디를 입력해주세요." 
                    onChange={handleInputId}
                />
                <input
                    className={styled.inputStyle}
                    type="password" 
                    disabled={checkCertify}
                    placeholder="클레스넷 비밀번호를 입력해주세요." 
                    onChange={handleInputPw}
                />      
                {
                    errorMessage && <p style={{ color : "#FF0000", fontFamily : 'KyoboHand', fontWeight : 'bold'}}>학생 인증이 완료되지 않았습니다. 다시 입력해주세요.</p>
                }
                {
                    checkCertify ?
                    <p style={{ color : "#fc9258", fontFamily : 'KyoboHand', fontWeight : 'bold'}}>인증이 완료되었습니다!</p>
                    :
                    <button 
                        className={styled.authButton}
                        onClick={onClickCertify}
                    >
                        학생 인증하기
                    </button>
                }
            </Modal.Body>
            {
                checkSignup?   
                <p style={{ display: 'none', fontFamily : 'KyoboHand', fontWeight : 'bold'}}>인증이 완료되었습니다!</p>
                :
                <p style={{ color : "#FF0000", fontFamily : 'KyoboHand', fontWeight : 'bold'}}>이미 기존에 가입된 클래스넷 아이디입니다.</p>
            }
            <div>
                <button 
                    className={styled.modalButton}
                    onClick={props.handleClose}
                >
                    취소
                </button>
                <button 
                    disabled={!checkCertify}
                    className={styled.modalButton}
                    onClick={onClickSignUp}
                >
                    가입하기
                </button>
            </div>
        </Modal>
        </>
    );
}

export default SignUp;