import React, {  } from 'react';
import style from '../main.module.css';
import styled from './selectSubject.module.css';
import { useState, useEffect } from 'react';
import {MdSettings, } from 'react-icons/md';
import {HiOutlineRefresh, } from 'react-icons/hi';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


function SelectSubject () {
    const [show, setShow] = useState(false);
    const handleClose = () => {setShow(false); setSubCheck(false); setProfCheck(false); setClassCheck(false);};
    const handleShow = () => setShow(true);
    
    const [checkSub, setSubCheck] = useState(false);
    const [checkProf, setProfCheck] = useState(false);
    const [checkClass, setClassCheck] = useState(false);
    const [subjectId, setSubjectID] = useState(0);
    const [professorId, setProfessorID] = useState(0);
    const [classNumId, setClassNumID] = useState(0);

    const [userSubject, setUserSubject] = useState([]);

    const [allData, setAllData] = useState([]);
    const [infoData, setInfoData] = useState([]);

    const subjectChange = (e) => {
        if (e.target.value === '0'){
            setSubCheck(false)
            setProfCheck(false)
            setClassCheck(false)
        } else {
            setSubCheck(true)
            setProfCheck(false)
            setClassCheck(false)
        }
        e.target.value === '0' ? setSubjectID(Number(e.target.value)) : setSubjectID(Number(e.target.value))
    }

    const professorChange = (e) => {
        if (e.target.value === '0'){
            setProfCheck(false)
            setClassCheck(false)
        } else {
            setProfCheck(true)
            setClassCheck(false)
        }
        e.target.value === '0' ? setProfessorID(Number(e.target.value)) : setProfessorID(Number(e.target.value))
    }

    const classNumChange = (e) => {
        e.target.value === '0' ? setClassCheck(false) : setClassCheck(true)
        setClassNumID(Number(e.target.value))
    }

    const refreshSubject = () => {
        axios.delete(`http://127.0.0.1:8000/usersubject/${localStorage.getItem('id')}`).then(()=>{}).catch()
        setUserSubject([])
        setSubCheck(false)
        setProfCheck(false)
        setClassCheck(false)
        setSubjectID(0)
        setProfessorID(0)
    }

    const deleteSubject = (e) => {
        const userSubjectid = e.target.value
        axios.delete(`http://127.0.0.1:8000/usersubject/${localStorage.getItem('id')}/${userSubjectid}`).then(()=>{
            axios.get(`http://127.0.0.1:8000/usersubject/${localStorage.getItem('id')}`)
            .then((response)=> {
                setUserSubject(response.data);
            })
        }).catch()
    }

    const addSubjectLabel = () => {
        setSubjectID(0); setProfessorID(0); setClassNumID(0);
        setSubCheck(false); setProfCheck(false); setClassCheck(false);
        axios.post(`http://127.0.0.1:8000/usersubject/`,{
            user_id : localStorage.getItem('id'),   
            subject_id : subjectId,
            professor_id : professorId,
            classnum : classNumId
        }).then(()=>{
            axios.get(`http://127.0.0.1:8000/usersubject/${localStorage.getItem('id')}`)
            .then((response)=> {
                setUserSubject(response.data);
            }).catch()
        })
    }

    const susetColor = ['#F5751C', '#FFAB72', '#FEBA95', '#FFD6AA', '#F9E1D5', '#EDDED9', '#ABB0B6', '#949F97']

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/subject/")
        .then((response)=> {
            setAllData(response.data)
            axios.get(`http://127.0.0.1:8000/usersubject/${localStorage.getItem('id')}`)
            .then((response)=> {
                console.log(response.data)
                setUserSubject(response.data)
            }).catch()
        }).catch()
    }, []);

    return(
        <>
            <div className={style.boxHeader}>
                내 수업
                <button style={{position : 'absolute', right : '5%', border : 'none', backgroundColor: '#FFF3E6'}} onClick={handleShow}>
                    <MdSettings />
                </button>
                
                <Offcanvas show={show} onHide={handleClose} placement={'top'} className={styled.canvas}>
                    <Offcanvas.Header>
                        <div>
                            <Offcanvas.Title style={{fontSize : '30px'}}>
                                과목 필터링
                            </Offcanvas.Title>
                            {
                                userSubject.length >= 8 && 
                                <div style={{color : '#FFAB72'}}>
                                    수업은 총 8개까지 설정할 수 있습니다!! 수정하고 싶은 수업이 있다면 수업 우측의 X를 누르거나 초기화 버튼을 눌러주세요.
                                </div>
                            }
                        </div>
                        <button style={{marginRight :'20px'}} className={styled.add} onClick={refreshSubject}><HiOutlineRefresh/> 초기화하기</button>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className={styled.selectBody}>
                            <Form.Select className={styled.selctBox} onChange={subjectChange} disabled={userSubject.length >= 8}>
                                <option value="0">과목 선택</option>
                                {
                                    allData.map((subject, index)=>{
                                        return(
                                            <option value={index + 1} key={subject['subject_title']}>{subject['subject_title']}</option>
                                        );
                                    })
                                }
                            </Form.Select>
                            <Form.Select className={styled.selctBox} onChange={professorChange} disabled={!checkSub}>
                                {
                                    subjectId === 0
                                    ? <option value="0">교수님 선택</option>
                                    :
                                        <>
                                        <option value="0">교수님 선택</option>
                                        {
                                            
                                            JSON.parse(allData[subjectId - 1]['professor']) && JSON.parse(allData[subjectId - 1]['professor'])
                                            .map((professor, index)=>{
                                                return(
                                                    <option value={index + 1} key={professor}>{professor}</option>
                                                );
                                            })
                                        }
                                        </>
                                }
                            </Form.Select>
                            <Form.Select className={styled.selctBox} onChange={classNumChange} disabled={!checkSub || !checkProf}>
                                {
                                    subjectId === 0 || professorId === 0
                                    ? <option value="0">분반 선택</option>
                                    :
                                    <>
                                        <option value="0">분반 선택</option>
                                        {
                                            JSON.parse(allData[subjectId - 1]['classnum'])[professorId - 1] && JSON.parse(allData[subjectId - 1]['classnum'])[professorId - 1]
                                            .map((classnum, index)=>{
                                                return(
                                                    <option value={index + 1} key={classnum}>{classnum}</option>
                                                );
                                            })
                                        }
                                    </>
                                }
                            </Form.Select>
                            <button className={styled.add} disabled={!(checkSub && checkProf && checkClass)} onClick={addSubjectLabel}>추가하기</button>
                        </div>
                        <hr/>
                        <div className={styled.subjectList}> 
                            {
                                userSubject.map(function(list, index){
                                    return (
                                        <div style={{background : `${susetColor[index]}`}} className={styled.subjectCol} key={list.id}>
                                            <div style={{textAlign : 'center', width : '100%'}}>
                                                &lt;{allData[list['subject_id'] - 1]['subject_title']}&gt;<br/>
                                                &lt;{JSON.parse(allData[list['subject_id'] - 1]['professor'])[list['professor_id'] - 1]}&gt;<br/>
                                                &lt;{JSON.parse(allData[list['subject_id'] - 1]['classnum'])[list['professor_id'] - 1][list['classnum'] - 1]}&gt;
                                            </div>
                                            <button value={list.id} onClick={deleteSubject} 
                                                style={{
                                                    border : 'none', 
                                                    fontFamily : 'initial', 
                                                    textAlign : 'center',
                                                    verticalAlign: 'middle',
                                                    color : 'white', 
                                                    fontWeight : 'bold', 
                                                    marginLeft :'5px', 
                                                    background : 'transparent'
                                                }}
                                            >X</button>
                                        </div>
                                    );
                                }) 
                            }
                        </div>
                    </Offcanvas.Body>
                    
                </Offcanvas>
            </div>
            <div className={styled.subjectBox}>
                {
                    userSubject.map(function(list, index){
                        return (
                            <div style={{background : `${susetColor[index]}`,}} className={styled.subjectCol} key={list.id}>
                                <div style={{textAlign : 'center', width : '100%'}}>
                                    &lt;{allData[list['subject_id'] - 1]['subject_title']}&gt;<br/>
                                    &lt;{JSON.parse(allData[list['subject_id'] - 1]['professor'])[list['professor_id'] - 1]}&gt;<br/>
                                    &lt;{JSON.parse(allData[list['subject_id'] - 1]['classnum'])[list['professor_id'] - 1][list['classnum'] - 1]}&gt;
                                </div>
                                <button value={list.id} onClick={deleteSubject} 
                                    style={{
                                        border : 'none', 
                                        fontFamily : 'initial', 
                                        textAlign : 'center',
                                        verticalAlign: 'middle',
                                        color : 'white', 
                                        fontWeight : 'bold', 
                                        marginLeft :'5px', 
                                        background : 'transparent'
                                    }}
                                >X</button>
                            </div>
                        );
                    }) 
                }
            </div>
        </>
    );
}

export default SelectSubject;