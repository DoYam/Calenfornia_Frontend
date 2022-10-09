import React, { useState } from 'react';
import style from './main.module.css';
import Calendar from './MainRight/Calendar.jsx';
import logout from '../../components/auth/logout_func';
import Guide from '../../components/guide/guide';

function MainRightScreen () {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    return(
        <div className={style.screen}>
            <div className={style.screenHeader}>
                <div style={{display : 'flex'}}>
                    <button className={style.subButton} onClick={handleShow}>사용 방법</button>
                    <Guide show={show} setShow={setShow}/>
                </div>
                <div style={{display : 'flex'}}>
                    <div className={style.yajasoo}>
                    야자수 {localStorage.getItem('id')} 님 어서오세요! 
                    </div>
                    <button className={style.logOut} onClick={logout}>로그아웃</button>
                </div>
            </div>
            <Calendar/>
        </div>
    );

}

export default MainRightScreen;