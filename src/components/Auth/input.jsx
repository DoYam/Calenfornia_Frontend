import styled from '../../screens/Login/login.module.css';

const AuthInput = (props) => {
    return (
        <>
            <input 
                className={styled.inputStyle}
                value={props.classnet_id}
                onChange={props.onChangeId}
                placeholder="클래스넷 아이디를 입력해주세요" 
            />
            <br/>
            <input 
                className={styled.inputStyle}
                value={props.classnet_pw}
                onChange={props.onChangePw}
                type="password"
                placeholder="클래스넷 비밀번호를 입력해주세요"
            />
        </>
    );
}

export default AuthInput;