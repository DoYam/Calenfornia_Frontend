import React from 'react';
import styled from '../../screens/Login/login.module.css';
import { Modal } from 'react-bootstrap';
import useSignup from '../../hooks/useSignup';

const SignUp = (props) => {

    const {
        checkCertify, errorMessage,
        checkSignup,
        handleInputId, handleInputPw,
        onClickCertify, onClickSignUp
    } = useSignup();

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