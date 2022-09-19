import { useState } from 'react';
import axios from 'axios';

const useSignup = () => {
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
        axios.post("/accounts/classnet/", {
            classnetid : classnetId,
            classnetpw : classnetPw
        })
        .then(() => {
            axios.get("/accounts/classnet/").then(
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
        axios.post("/accounts/signup/", {
            classnet : checkCertify,
            classnetid : classnetId,
            classnetpw : classnetPw,
        })
        .then(() => {
            axios.get("/accounts/signup/"
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

    return {
        checkCertify, errorMessage,
        checkSignup,
        handleInputId, handleInputPw,
        onClickCertify, onClickSignUp
    };
}

export default useSignup;