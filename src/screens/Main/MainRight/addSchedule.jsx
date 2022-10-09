import React, { useState, useEffect } from 'react';
import styled from './addSch.module.css';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import RenderCells  from "./Calendar.jsx";
import { useRef } from 'react';
import { format } from 'date-fns';
// import useSubject from '../../hooks/useSubject';

function leftPad(value) {
    if (value >= 10) {
        return value;
    }
    return `0${value}`;
}

// function format(source, delimiter = '-') {
//     const year = source.getFullYear();
//     const month = source.getMonth() + 1;
//     const day = source.getDate();

//     return [year, month, day].join(delimiter);
// }


function AddSchedule(props){
    const [subList, setSubjectData] = useState([]);
    const [subjectId, setSubjectId] = useState(0);
    const [professorId, setProfessorId] = useState(0);
    const [classNum, setClassNum] = useState(0);
    const [category, setCategory] = useState(0)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    let [infoData, setInfoData] = useState([]);
    let [targetDate, setTargetDate] = useState(new Date());

    // const {
    //     checkSub, checkProf, checkClass,
    //     subjectId, professorId, 
    //     show, handleClose, handleShow, 
    //     userSubject, allData,
    //     subjectChange, professorChange, classNumChange,
    //     refreshSubject, deleteSubject, addSubjectLabel
    // } = useSubject();


    useEffect(() => {
        axios.get("http://43.201.34.118:3306/subject/")
        .then((response)=> {
            setSubjectData(response.data);
        }).catch()
    }, []);


    const postThings = ()  => {
        targetDate = format(targetDate);

        console.log('targetdate 형식 보기');
        console.log(targetDate);
        
        setSubjectId(0);
        setProfessorId(0);
        setClassNum(0);
        setCategory(0);
        setTargetDate(new Date());
        setTitle('');
        setDescription('');


        axios.post("http://43.201.34.118:3306/info/",
          { 
                user_id : localStorage.getItem('id'),
                title : title,
                subject_id : subjectId,
                professor_id : professorId,
                classnum : classNum,
                category_id : category,
                date : targetDate,
                description : description,
          })
          .then((response) => {
            console.log(subjectId);
            console.log(professorId);
            console.log(classNum);
            console.log(category);
            console.log(targetDate);
            console.log(title);
            console.log(description);
            console.log(response);
            console.log('일정추가 post 성공');
            props.handleClose();
            axios.get(`http://43.201.34.118:3306/infos/${localStorage.getItem('id')}`,
            ).then((response) => {
                console.log('<<infodata확인>>');
                setInfoData(response.data);
                console.log(infoData);
            }
            ).catch(

            );
          })
          .catch(function (error) {
              console.log(error.response);
              console.log('일정추가 안 됨');
          });

          return(
            <div>
                <RenderCells />
            </div>
          );
    };

    const subjectHandler = (e) => {
        setSubjectId(Number(e.target.value));
        // console.log(subjectId);
    };

    const professorHandler = (e) => {
        setProfessorId(Number(e.target.value));
        // console.log(professorId);
    };

    const classNumHandler = (e) => {
        var idx = e.target.value;
        setClassNum(Number(subList[subjectId-1]['classnum'][professorId-1][idx-1]));
        // setClassNum(e.target.value);
        // console.log(classNum);
    };

    const categoryHandler = (e) => {
        setCategory(e.target.value);
        // console.log(category);
    }

    const titleHandler = (e) => {
        setTitle(e.target.value);
        // console.log(title);
    }

    const descriptionHandler = (e) => {
        setDescription(e.target.value);
    }

    const currentMonth = new Date();

    return (
        <>
            <Modal 
                show={props.show} 
                onHide={props.handleClose}
                size="lg"
                centered
            >   
                <Modal.Header closeButton/>
                <Modal.Body style={{height : '400px', }}>
                    <div style={{display : 'flex', }}>
                        <div className={styled.box}> 
                            <div style={{display: 'flex', justifyContent : 'space-between'}}>
                                <label style={{fontWeight : 'bold', fontSize : '18px'}}>과목</label>
                                <Form.Select className ={styled.select_box}  onChange={subjectHandler}>
                                    <option value="0">과목을 선택해주세요</option>
                                    {/* {
                                        subList.map((subject, index) => {
                                            return (
                                                <option value={index+1} key={subject["subject_title"]}>{subject["subject_title"]}</option>
                                            );
                                        })
                                    } */}
                                    {
                                        allData.map((subject, index)=>{
                                            return(
                                                <option value={index + 1} key={subject['subject_title']}>{subject['subject_title']}</option>
                                            );
                                        })
                                    }
                                </Form.Select>
                            </div>
                            <div style={{display: 'flex', justifyContent : 'space-between'}}>
                                <label style={{fontWeight : 'bold', fontSize : '18px'}}>교수명</label>
                                <Form.Select className ={styled.select_box} onChange={professorHandler}>
                                    {/* {
                                        subjectId === 0
                                        ? <option value="0">교수님 선택</option>
                                        :
                                            <>
                                            <option value="0">교수님 선택</option>
                                            {
                                                JSON.parse(subList[subjectId - 1]['professor']) && JSON.parse(subList[subjectId - 1]['professor'])
                                                .map((professor, index)=>{
                                                    return(
                                                        <option value={index + 1} key={professor}>{professor}</option>
                                                    );
                                                })
                                            }
                                            </>
                                    } */}

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
                            </div>
                            <div style={{display: 'flex', justifyContent : 'space-between'}}>
                                <label style={{fontWeight : 'bold', fontSize : '18px'}}>분반</label>
                                <Form.Select className ={styled.select_box} onChange={classNumHandler}>
                                    {/* {
                                        subjectId === 0 || professorId === 0
                                            ? <option key="0" >분반을 선택해주세요</option>
                                            :
                                            <>
                                                <option value="0">분반을 선택해주세요</option>
                                                {
                                                    JSON.parse(subList[subjectId - 1]['classnum'][professorId-1]) && JSON.parse(subList[subjectId - 1]['classnum'][professorId-1])
                                                            .map((classnum, index)=>{
                                                                return(
                                                                    <option value={index + 1} key={classnum}>{classnum}</option>
                                                                );
                                                        })
                                                }
                                            </>
                                    } */}

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
                            </div>

                            <div style={{display: 'flex', justifyContent : 'space-between'}}>
                                <label style={{fontWeight : 'bold', fontSize : '18px'}}>카테고리</label>
                                <Form.Select className ={styled.select_box} onChange={categoryHandler}>
                                    <option value='0'>카테고리를 선택해주세요</option>
                                    <option value='1'>중간고사</option>
                                    <option value='2'>기말고사</option>
                                    <option value='3'>과제</option>
                                    <option value='4'>퀴즈</option>
                                </Form.Select>
                            </div>
                            <div style={{display: 'flex', justifyContent : 'space-between'}}>
                                <label style={{fontWeight : 'bold', fontSize : '18px'}}>날짜</label>
                                <div>
                                    <DatePicker 
                                        className={styled.date_select}
                                        selected={targetDate}
                                        dateFormat="yyyy-MM-dd"
                                        minDate={new Date()} 
                                        onChange={(date) => (setTargetDate(date))}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styled.box}>
                            <div style={{display: 'flex', justifyContent : 'space-between'}}>
                                <label style={{fontWeight : 'bold', fontSize : '18px'}}>일정 제목</label>
                                <input
                                    className={styled.inputStyle}
                                    value={title}
                                    onChange={titleHandler}
                                />
                            </div>
                            <div>
                                <label style={{fontWeight : 'bold', fontSize : '18px'}}>상세 설명</label>
                                <div style={{textAlign : 'center'}}>
                                    <textarea 
                                        className={styled.description}
                                        rows="10"
                                        cols="40"
                                        onChange={descriptionHandler}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styled.btn_box}>
                        <button className={styled.button} onClick={props.handleClose}>취소하기</button>
                        <button className={styled.button} onClick={postThings}>추가하기</button>
                        {/* <RenderCells currentMonth={currentMonth}  infoData={infoData}/> */}
                        {/* <AddSchedule  show={show} handleClose ={handleClose}/> */}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddSchedule;