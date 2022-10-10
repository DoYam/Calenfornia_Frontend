import React, { useState } from 'react';
import style from './guide.module.css';
import { Modal } from 'react-bootstrap';
import guide0 from '../../assets/images/guide0.svg';
import guide1 from '../../assets/images/guide1.png';
import guide3 from '../../assets/images/guide3.png';

const Information = (props) => {
    return(
        <div className={style.informationForm}>
            <p>{props.num}</p>
            <div style={{textAlign: 'center'}}>
                <img src={props.image} style={{width: '70%'}} alt=""/>
            </div>
            <p>{props.content}</p>
        </div>
    );
}

const Guide = (props) => {
    const handleClose = () => props.setShow(false);

    return (
        <Modal show={props.show} onHide={handleClose} style={{textAlign: 'center', fontFamily : 'KyoboHand'}} centered size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>Calenfornia 에 오신 것을 환영합니다!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={style.information}>
                    <Information 
                        num={1} 
                        image={guide0} 
                        content={`안녕하세요~! 캘린포니아는 '홍익대학교 컴퓨터공학과' 수업 일정 공유 웹사이트 입니다.
                            수업에 대한 일정들을 공유하고 이에 대해 학우분들과 함께 소통해주세요!`}
                    />
                    <Information 
                        num={2} 
                        image={guide1} 
                        content={`먼저 본인이 수강하는 [과목, 교수, 분반]에 맞는 항목을 선택하여 필터링해주세요.
                            '내 수업' 오른쪽에 위치한 톱니바퀴 버튼을 클릭하여 필터링을 진행할 수 있습니다.
                        최대로 저장할 수 있는 수업 항목은 8개입니다.`}
                    />
                </div>
                <div className={style.information}>
                    <Information 
                        num={3} 
                        image={guide0} 
                        content={`캘린더에 게시되어 있는 일정들을 클릭하면 해당 수업에 대한 정보들을 얻을 수 있습니다!
                        만약 잘못되어 있는 정보가 보인다면 다른 사람들을 위해 정확히 수정해주세요!`}
                    />
                    <Information 
                        num={4} 
                        image={guide3} 
                        content={`캘린더에 수업에 대한 일정을 추가할 수 있습니다! 수업 일정을 추가할 때
                        여러 사람들을 위해 정확한 정보가 맞는지 확인 후 게시해주세요! 여러분께서 남겨주신 
                        일정들(과목, 교수, 분반이 일치하는)을 수강하는 학생들은 열람, 수정 가능하도록 공유됩니다.`}
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default Guide;