import React, { useEffect , useState} from 'react';
import { Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import './InfoCal.css';

const InfoOnCalendar = (props) => {
    const [subList, setSubjectData] = useState([]);
    // const [infoList, setInfoList] = useState([]);

    useEffect(() => {
        axios.get("http://43.201.34.118:3306/subject/")
        .then((response)=> {
            setSubjectData(response.data);
        }).catch()
    }, []);

    return (
        <>
        <Modal 
        show={props.show} 
        onHide={props.handleClose}
        size="lg"
        centered
        >
            <Modal.Header closeButton>
                {/* <Modal.Title>info창입니다</Modal.Title> */}
                <button className='fixBtn'>수정하기</button>
                {/* <div>아이디 = {props.info.id}</div> */}
            </Modal.Header>
            <Modal.Body>
                <Form className='box'>
                    <Form.Group className='left'>
                        <div>
                            <Form.Label style={{fontWeight: 'bold', fontSize: '20px'}}>일정</Form.Label>
                            <span className='contents' 
                            style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                width: '300px',
                                paddingLeft: '10px',
                            }}>{props.info.title}</span>
                        </div>
                        <div>
                            <Form.Label>과목명</Form.Label>
                            {/* <span className='contents'>{Number(props.info['subject_id'])}</span> */}
                            <span className='contents'>{subList[Number(props.info['subject_id']) - 1]['subject_title']}</span>
                        </div>
                        <div>
                            <Form.Label>교수명</Form.Label>
                            <span className='contents'>{props.info['professor_id']}</span>
                            {/* <span className='contents'>{JSON.parse(subList[props.info.subject_id - 1 - 1]['professor'][props.info.professor_id - 1])}</span> */}
                        </div>
                        <div>
                            <Form.Label>분반</Form.Label>
                            <span className='contents'>{props.info['classnum']}</span>
                            {/* <span className='contents'>{JSON.parse(subList[props.info.subject_id - 1 - 1]['classnum'][props.info.professor_id - 1][props.info.classnum - 1])}</span> */}
                        </div>
                        <div>
                            <Form.Label>카테고리</Form.Label>
                            <span className='contents'>{props.info.category_id}</span>
                        </div>
                        <div>
                            <Form.Label>날짜</Form.Label>
                            <span className='contents'>{props.info.date}</span>
                        </div>
                        <div>
                            <Form.Label>상세설명</Form.Label>
                            <span className='detail'>{props.info.description}</span>
                        </div>
                    </Form.Group>
                    <Form.Group className='right'>
                        <Form.Label>추가 정보</Form.Label>
                    </Form.Group>
                </Form>
                
            </Modal.Body>
            <div>
                
            </div>
        </Modal>
        </>
    );
};

export default InfoOnCalendar;



// import React, { useState, useEffect } from 'react';
// import styled from './addSch.css';
// import axios from 'axios';
// import { Button, Form, Modal } from 'react-bootstrap';
// import subject from '../MainLeft/subjectList';
// import DatePicker from "react-datepicker";
// import 'react-datepicker/dist/react-datepicker.css';
// import RenderCells  from "./Calendar.jsx";
// import { useRef } from 'react';

// function leftPad(value) {
//     if (value >= 10) {
//         return value;
//     }
//     return `0${value}`;
// }

// function format(source, delimiter = '-') {
//     const year = source.getFullYear();
//     const month = leftPad(source.getMonth() + 1);
//     const day = leftPad(source.getDate());

//     return [year, month, day].join(delimiter);
// }


// function AddSchedule(props){

    
//     const Subject = subject;

//     const [subjectId, setSubjectId] = useState(0);
//     const [professorId, setProfessorId] = useState(0);
//     const [classNum, setClassNum] = useState(0);
//     const [category, setCategory] = useState(0)
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');

//     let [infoData, setInfoData] = useState([]);
    
//     let [targetDate, setTargetDate] = useState(new Date());

//     const postThings = ()  => {
//         targetDate = format(targetDate);

//         setSubjectId(0);
//         setProfessorId(0);
//         setClassNum(0);
//         setCategory(0);
//         setTargetDate(new Date());
//         setTitle('');
//         setDescription('');


//         axios.post("http://localhost:8000/info/",
//           { 
//                 user_id : localStorage.getItem('id'),
//                 title : title,
//                 subject_id : subjectId,
//                 professor_id : professorId,
//                 classnum : classNum,
//                 category_id : category,
//                 date : targetDate,
//                 description : description,
//           })
//           .then((response) => {
//             console.log(subjectId);
//             console.log(professorId);
//             console.log(classNum);
//             console.log(category);
//             console.log(targetDate);
//             console.log(title);
//             console.log(description);
//             console.log(response);
//             console.log('일정추가 post 성공');
//             props.handleClose();
//             axios.get(`http://localhost:8000/infos/${localStorage.getItem('id')}`,
//             ).then((response) => {
//                 console.log('<<infodata확인>>');
//                 setInfoData(response.data);
//                 console.log(infoData);
//             }
//             ).catch(

//             );
//           })
//           .catch(function (error) {
//               console.log(error.response);
//               console.log('일정추가 안 됨');
//           });

//           return(
//             <div>
//                 <RenderCells />
//             </div>
//           );
//     };

//     const subjectHandler = (e) => {
//         setSubjectId(Number(e.target.value));
//         // console.log(subjectId);
//     };

//     const professorHandler = (e) => {
//         setProfessorId(Number(e.target.value));
//         // console.log(professorId);
//     };

//     const classNumHandler = (e) => {
//         var idx = e.target.value;
//         // setClassNum(Number(Subject[subjectId-1]['classnum'][professorId-1][idx-1]));
//         setClassNum(e.target.value);
//         // console.log(classNum);
//     };

//     const categoryHandler = (e) => {
//         setCategory(e.target.value);
//         // console.log(category);
//     }

//     const titleHandler = (e) => {
//         setTitle(e.target.value);
//         // console.log(title);
//     }

//     const descriptionHandler = (e) => {
//         setDescription(e.target.value);
//     }

//     const currentMonth = new Date();

//     return (
//         <>
//             <Modal 
//             show={props.show} 
//             onHide={props.handleClose}
//             >
//                 <Modal.Header closeButton> </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group className='mb-3'>
//                             <Form.Label>과목</Form.Label>
//                             <Form.Select className ={styled.select_box}  onChange={subjectHandler}>
//                                 <option value="0">과목을 선택해주세요</option>
//                                 {
//                                     Subject.map((subject, index) => {
//                                         return (
//                                             <option value={index+1} key={subject["subject"]}>{subject["subject"]}</option>
//                                         );
//                                     })
//                                 }
//                             </Form.Select>
//                             <Form.Label>교수명</Form.Label>
//                             <Form.Select className ="select-box" onChange={professorHandler}>
//                                 {
//                                     subjectId === 0
//                                     ? <option value="0">교수님 선택</option>
//                                     :
//                                         <>
//                                         <option value="0">교수님 선택</option>
//                                         {
//                                             Subject[subjectId - 1]['professor'] && Subject[subjectId - 1]['professor']
//                                             .map((professor, index)=>{
//                                                 return(
//                                                     <option value={index + 1} key={professor}>{professor}</option>
//                                                 );
//                                             })
//                                         }
//                                         </>
//                                 }
//                             </Form.Select>
//                             <label>분반</label>
//                             <Form.Select className ="select-box" onChange={classNumHandler}>
//                                 {
//                                     subjectId === 0 || professorId === 0
//                                         ? <option key="0" >분반을 선택해주세요</option>
//                                         :
//                                         <>
//                                             <option value="0">분반을 선택해주세요</option>
//                                             {
//                                                 Subject[subjectId - 1]['classnum'][professorId-1] && Subject[subjectId - 1]['classnum'][professorId-1]
//                                                         .map((classnum, index)=>{
//                                                             return(
//                                                                 <option value={index + 1} key={classnum}>{classnum}</option>
//                                                             );
//                                                     })
//                                             }
//                                         </>
//                                 }
//                             </Form.Select>
//                             <label>카테고리</label>
//                             <Form.Select className ="select-box" onChange={categoryHandler}>
//                                 <option value='0'>카테고리를 선택해주세요</option>
//                                 <option value='1'>중간고사</option>
//                                 <option value='2'>기말고사</option>
//                                 <option value='3'>과제</option>
//                                 <option value='4'>퀴즈</option>
//                             </Form.Select>
                       
//                             <label>날짜</label>
//                             <DatePicker 
//                                 className ="select-box"
//                                 selected={targetDate}
//                                 dateFormat="yyyy-MM-dd"
//                                 minDate={new Date()} 
//                                 onChange={(date) => (setTargetDate(date))}
//                             />
                            
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <div>
//                                 <label>일정 제목</label>
//                                 <input
//                                     className='select-box'
//                                     name="title" 
//                                     type="text"
//                                     value={title}
//                                     onChange={titleHandler}
//                                 />
//                             </div>
//                             <div>
//                                 <label>상세 설명</label>
//                                 <textarea 
//                                 className='select-box'
//                                 rows="10"
//                                 cols="40"
//                                 onChange={descriptionHandler}
//                                 ></textarea>
//                             </div>
//                         </Form.Group>
//                     </Form>
//                     <div className='btn-box'>
//                         <button className='btn1' onClick={props.handleClose}>취소하기</button>
//                         <span>
//                         <button className='btn2' onHide={props.handleClose} onClick={postThings}>추가하기</button>
//                         {/* <RenderCells currentMonth={currentMonth}  infoData={infoData}/> */}
//                         {/* <AddSchedule  show={show} handleClose ={handleClose}/> */}
//                         </span>
                        
//                     </div>
                    
//                 </Modal.Body>
//             </Modal>
//         </>
//     );
// }

// export default AddSchedule;