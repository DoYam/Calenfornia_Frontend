import React, { useState } from 'react';
import style from './main.module.css';
import Calendar from './MainRight/Calendar.jsx';
import logout from './MainRight/logout_func.jsx';
import guide0 from './guide0.svg';
import guide1 from './guide1.png';
import { Modal } from 'react-bootstrap';

function MainRightScreen () {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    return(
        <div className={style.screen}>
            <div className={style.screenHeader}>
                <div style={{display : 'flex'}}>
                    <button className={style.subButton} onClick={handleShow}>사용방법</button>
                    <Modal show={show} onHide={handleClose} style={{textAlign: 'center', fontFamily : 'KyoboHand'}} centered size='xl'>
                        <Modal.Header closeButton>
                            <Modal.Title>Calenfornia 에 오신 것을 환영합니다!!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className={style.information}>
                                <div className={style.informationForm}>
                                    <p>1</p>
                                    <div style={{textAlign: 'center'}}>
                                        <img src={guide0} style={{width: '60%'}}/>
                                    </div>
                                    <p>안녕하세요~! 캘린포니아는 '홍익대학교 컴퓨터공학과' 수업 일정 공유 웹사이트 입니다.
                                        수업에 대한 일정들을 공유하고 이에 대해 학우분들과 함께 소통해주세요!</p>
                                </div>
                                <div className={style.informationForm}>
                                    <p>2</p>
                                    <div style={{textAlign: 'center'}}>
                                        <img src={guide1} style={{width: '100%'}}/>
                                    </div>
                                    <p>먼저 본인이 수강하는 [과목, 교수, 분반]에 맞는 항목을 선택하여 필터링해주세요.
                                        '내 수업' 오른쪽에 위치한 톱니바퀴 버튼을 클릭하여 필터링을 진행할 수 있습니다.
                                    최대로 저장할 수 있는 수업 항목은 8개입니다.</p>
                                </div>
                            </div>
                            <div className={style.information}>
                                <div className={style.informationForm}>
                                    <p>3</p>
                                    <div style={{textAlign: 'center'}}>
                                        <img src={guide0} style={{width: '60%'}}/>
                                    </div>
                                    <p>캘린더에 게시되어 있는 일정들을 클릭하면 해당 수업에 대한 정보들을 얻을 수 있습니다!
                                    만약 잘못되어 있는 정보가 보인다면 다른 사람들을 위해 정확히 수정해주세요!</p>
                                </div>
                                <div className={style.informationForm}>
                                    <p>4</p>
                                    <div style={{textAlign: 'center'}}>
                                        <img src={guide0} style={{width: '60%'}}/>
                                    </div>
                                    <p>캘린더에 수업에 대한 일정을 추가할 수 있습니다! 수업 일정을 추가할 때
                                    여러 사람들을 위해 정확한 정보가 맞는지 확인 후 게시해주세요! 여러분께서 남겨주신 
                                    일정들(과목, 교수, 분반이 일치하는)을 수강하는 학생들은 열람, 수정 가능하도록 공유됩니다.</p>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    {/* <button className={style.subButton}>공유하기</button> */}
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