import {React, useState, useEffect} from 'react';
import "./cal.css";
import {MdChevronRight, MdChevronLeft} from 'react-icons/md';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import axios from 'axios';
import AddSchedule from './addSchedule';
import InfoOnCalendar from './InfoOnCalendar';


const RenderHeader = ({currentMonth, prevMonth, nextMonth }) => {

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);


    return (
        <div className="header">
                <span className = "year">
                    {format(currentMonth, 'yyyy')}
                </span>
                <span className = "month">
                        <button style={{border: 'none', background:'transparent'}} onClick={prevMonth}><MdChevronLeft/></button>
                            <span className = "text month">
                                {format(currentMonth, 'M')}
                            </span>
                        <button style={{border: 'none', background:'transparent'}} onClick={nextMonth}><MdChevronRight/></button>
                 </span>
                 <span>
                    <button className="plusSchedule" onClick={handleShow1}>일정 추가하기</button>
                    <AddSchedule  show={show1} handleClose ={handleClose1}/>
                    {/* <AddSchedule show={show}/> */}
                 </span>
        </div>
    );
};


const RenderCells = ({currentMonth, info}) => {

    const [show, setShow] = useState(false);
    const [id, setId] = useState(-1);
    const [targetInfo, setTarget] = useState([]);

    const [subList, setSubjectData] = useState([]);

    const [subject, setSubject] = useState("");
    const [professor, setProfessor] = useState("");
    const [classnum, setClassnum] = useState(0);

    const handleClose = () => {
        setShow(false);
    }
    
    const handleShow = (param) => {
        console.log("target");
        console.log(param);
        setShow(true);

        axios.get(`http://43.201.34.118:3306/info/${param}/`)
            .then((response)=>{
                console.log("버튼 클릭시 조회");
                console.log(response.data);
                setTarget(response.data);
                setSubject(subList[response.data.subject_id - 1]['subject_title']);
                setProfessor(JSON.parse(subList[response.data.subject_id - 1]['professor'])[response.data.professor_id - 1]);
                setClassnum(JSON.parse(subList[response.data.subject_id - 1]['classnum'])[response.data.professor_id - 1][response.data.classnum - 1]);
            })
            .catch();
        
    }

    useEffect(() => {
        axios.get("http://43.201.34.118:3306/subject/")
        .then((response)=> {
            setSubjectData(response.data);
        }).catch()
    }, []);


    // function leftPad(value) {
    //     if (value >= 10) {
    //         return value;
    //     }
    //     return `0${value}`;
    // }

    const dayWeek = [];
    const date = ['Sunday', 'Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday'];

    const susetColor = ['#F5751C', '#FFAB72', '#FEBA95', '#FFD6AA', '#F9E1D5', '#EDDED9', '#ABB0B6', '#949F97']

    dayWeek.push( <td className ="col" style={{color : 'red'}} key={0}>{date[0]}</td>);
    for ( let i=1; i<7; i++){
        dayWeek.push (
            <td className ="col" key={i}>
                {date[i]}
            </td>,
        ); 
    }

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedYear='';
    let formattedMonth='';
    let formattedDate = '';
    let dayString = '';
    let now = new Date()
    let nowDate = String(now.getDate());
    let nowMonth = String(now.getMonth() + 1);
    const delimiter ='-';


    function leftPad(value) {
        if (value >= 10) {
            return value;
        }
        return `0${value}`;
    }



    while (day <= endDate) {
        
        for (let i = 0; i < 7; i++) {
            // 비교를 위한 모든 날짜 string 형식 맞추기
            formattedYear = format(currentMonth, 'yyyy');
            formattedMonth = leftPad(format(currentMonth,'M'));
            formattedDate = leftPad(format(day, 'd'));
            dayString = [formattedYear, formattedMonth, formattedDate].join(delimiter);
            // console.log(dayString);

            //오늘 날짜에 일정추가일때 
            // : 오늘이 아닌 날짜에 일정추가일때(but currentMonth여야함ㅜ)

            days.push(
                <td className={
                    `td ${format(currentMonth, 'M') !== format(day, 'M')
                    ? 'not-valid'
                    : ' '}`} key={i}
                >
                {
                    //오늘 날짜 빨간표시
                    (
                        format(currentMonth, 'M') === nowMonth) && (formattedDate === leftPad(nowDate))
                        ? <div>
                            <div style={{background:'#FFAB72', color : 'white', borderRadius : '100%', width : '35px', textAlign : 'center'}}>
                            {formattedDate}</div>
                            <div>
                                <div>
                                {/* 일정 추가 부분-1 */}
                                {
                                    info.map((t)=>{
                                        if(dayString == t.date){
                                            return (
                                                <div key={t.id}>
                                                    <button className='info-box' onClick={() => {handleShow(t.id)}}>
                                                        {t.title} 
                                                    </button>
                                                    <InfoOnCalendar show={show} handleClose={handleClose} info={targetInfo} />
                                                </div>
                                            )
                                        }
                                        
                                    })
                                }
                            
                                </div> 
                            </div>
                        </div>
                    : 
                    <div>
                        {
                            i == 0 ?
                            <p style={{color : '#FF0000'}}>{formattedDate}</p>
                            : formattedDate
                        }
                        <div>
                            <div>
                            {/* 일정 추가 부분-2 */}
                            { 
                                info.map((t)=>{
                                    if(dayString == t.date){
                                        return (
                                            <div key={t.id}>
                                                <button className='info-box' onClick={() => {handleShow(t.id)}}>
                                                    {t.title}
                                                </button>
                                                <InfoOnCalendar show={show} handleClose={handleClose} info={targetInfo} subject={subject} professor={professor} classnum={classnum}/>
                                            </div>
                                           
                                        )
                                    }
                                    
                                })
                            }
                            
                            </div> 
                        </div>
                    </div>                 
                }
                </td>
            );
            day = addDays(day,1);
        }

        rows.push(
            <tr className="tr" key={day}>
                {days}
            </tr>
        );

        days=[];
    }//while문

    return (
        <table>
            <tbody>
                <tr>{dayWeek}</tr> 
                {rows}
            </tbody>
        </table>
    );
};



const Calendar = (props) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [check, setCheck] = useState(false);


    //모든 사람이 등록한 전체 info
    const [infoData, setInfoData] = useState([]);

    //모든 info에서 필터링 된 내 info
    const [mySubInfo, setMySubInfo] = useState([]);


    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };


    useEffect(()=> {
        axios.get(`http://43.201.34.118:3306/infos/${localStorage.getItem('id')}`,
            ).then((response) => {
                console.log(response.data);
                setInfoData(response.data);
                axios.get(`http://43.201.34.118:3306/info/usersubject/${localStorage.getItem('id')}`,
                ).then((response) => {
                    console.log(',,,필터링 성공,,,');
                    console.log(response.data);
                    var parsed = response.data.reduce(function(accumulator, currentValue, index) {
                        return accumulator.concat(currentValue);
                    })
                    console.log("reduce 후");
                    console.log(parsed);
                    setMySubInfo(parsed);
                }
                ).catch()
            }
            ).catch();
    },[]);
    

    return (
        <div className="calBody">
            {/* <div className="header">Header</div> */}
            <RenderHeader
                currentMonth = {currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderCells
                currentMonth={currentMonth}
                info = {mySubInfo}
            />
            
        </div>
    );
};

export default Calendar;



// import {React, useState, useEffect} from ‘react’;
// import “./cal.css”;
// import {MdChevronRight, MdChevronLeft} from ‘react-icons/md’;
// import { format, addMonths, subMonths } from ‘date-fns’;
// import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from ‘date-fns’;
// import { isSameMonth, isSameDay, addDays, parse } from ‘date-fns’;
// import axios from ‘axios’;
// import AddSchedule from ‘./addSchedule’;
// const RenderHeader = ({currentMonth, prevMonth, nextMonth }) => {
//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//     return (
//         <div className=“header”>
//                 <span className = “year”>
//                     {format(currentMonth, ‘yyyy’)}
//                 </span>
//                 <span className = “month”>
//                         <button style={{border: ‘none’, background:‘transparent’}} onClick={prevMonth}><MdChevronLeft/></button>
//                             <span className = “text month”>
//                                 {format(currentMonth, ‘M’)}
//                             </span>
//                         <button style={{border: ‘none’, background:‘transparent’}} onClick={nextMonth}><MdChevronRight/></button>
//                  </span>
//                  <span>
//                     <button className=“plusSchedule” onClick={handleShow}>일정 추가하기</button>
//                     <AddSchedule  show={show} handleClose ={handleClose}/>
//                     {/* <AddSchedule show={show}/> */}
//                  </span>
//         </div>
//     );
// };
// const RenderCells = ({currentMonth, info}) => {
//     const dayWeek = [];
//     const date = [‘Sunday’, ‘Monday’, ‘Tuesday’,‘Wednesday’,‘Thursday’,‘Friday’,‘Saturday’];
//     dayWeek.push( <td className =“col” style={{color : ‘red’}} key={0}>{date[0]}</td>);
//     for ( let i=1; i<7; i++){
//         dayWeek.push (
//             <td className =“col” key={i}>
//                 {date[i]}
//             </td>,
//         );
//     }
//     const monthStart = startOfMonth(currentMonth);
//     const monthEnd = endOfMonth(monthStart);
//     const startDate = startOfWeek(monthStart);
//     const endDate = endOfWeek(monthEnd);
//     const rows = [];
//     let days = [];
//     let day = startDate;
//     let formattedYear=‘’;
//     let formattedMonth=‘’;
//     let formattedDate = ‘’;
//     let dayString = ‘’;
//     let now = new Date()
//     let nowDate = String(now.getDate());
//     let nowMonth = String(now.getMonth() + 1);
//     const delimiter =‘-’;
//     // let yearNum =format(currentMonth, ‘yyyy’)
//     // let monthNum = format(currentMonth,‘M’)
//     // let dayNum = formattedDate;
//     // const delimiter =‘-’;
//     // let whatDay = [yearNum, monthNum, dayNum].join(delimiter);
//     // console.log(whatDay);
//     while (day <= endDate) {
//         for (let i = 0; i < 7; i++) {
//             //비교를 위한 모든 날짜 string 형식 맞추기
//             formattedYear = format(currentMonth, ‘yyyy’)
//             formattedMonth = format(currentMonth,‘M’)
//             formattedDate = format(day, ‘d’);
//             dayString = [formattedYear, formattedMonth, formattedDate].join(delimiter);
//             // console.log(dayString);
//             //오늘 날짜에 일정추가일때 : 오늘이 아닌 날짜에 일정추가일때(but currentMonth여야함ㅜ)
//             days.push(
//                 <td className={
//                     `td ${format(currentMonth, ‘M’) !== format(day, ‘M’)
//                     ? ‘not-valid’
//                     : ' ’}`} key={i}
//                 >
//                 {
//                     //오늘 날짜 빨간표시
//                     (format(currentMonth, ‘M’) === nowMonth) && (formattedDate === nowDate)
//                     ? <div>
//                         <div style={{background:‘#FFAB72’, color : ‘white’, borderRadius : ’100%’, width : ‘35px’, textAlign : ‘center’}}>
//                             {formattedDate}
//                         </div>
//                         <div>
//                             <div>
//                              {/* 일정 추가 부분-1 */}
//                              {
//                                 true && info.map((t) => {
//                                     if(dayString === t.date)
//                                         return (
//                                             <div key={t.id}>
//                                                 <button className=‘info-box’>
//                                                     {t.title}
//                                                 </button>
//                                             </div>
//                                         )
//                                 })
//                             }
//                             </div>
//                         </div>
//                     </div>
//                     : <div>
//                         {
//                             i == 0 ?
//                             <p style={{color : ‘#FF0000’}}>{formattedDate}</p>
//                             : formattedDate
//                         }
//                         <div>
//                             <div>
//                             {/* 일정 추가 부분-2 */}
//                             {/* {
//                                 true && infoData.map((t) => {
//                                     if(dayString === t.date)
//                                         return (
//                                             <div key={t.id}>
//                                                 <button className=‘info-box’>
//                                                     {t.title}
//                                                 </button>
//                                             </div>
//                                         )
//                                 })
//                             } */}
//                             </div>
//                         </div>
//                     </div>
//                 }
//                 </td>
//             );
//             day = addDays(day,1);
//         }
//         rows.push(
//             <tr className=“tr” key={day}>
//                 {days}
//             </tr>
//         );
//         days=[];
//     }
//     return (
//         <table>
//             <tbody>
//                 <tr>{dayWeek}</tr>
//                 {rows}
//             </tbody>
//         </table>
//     );
// };
// const Calendar = () => {
//     const [currentMonth, setCurrentMonth] = useState(new Date());
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [infoData, setInfoData] = useState([]);
//     const [check, setCheck] = useState(false);
//     const prevMonth = () => {
//         setCurrentMonth(subMonths(currentMonth, 1));
//     };
//     const nextMonth = () => {
//         setCurrentMonth(addMonths(currentMonth, 1));
//     };
//     const eventHandler = () => {
//         setCheck(!check);
//     }
//     useEffect(()=> {
//         axios.get(`http://localhost:8000/infos/${localStorage.getItem('id')}`,
//             ).then((response) => {
//                 console.log(response.data);
//                 setInfoData(response.data);
//             }
//             ).catch();
//     },[check]);
//     return (
//         <div className=“calBody”>
//             {/* <div className=“header”>Header</div> */}
//             <RenderHeader
//                 currentMonth = {currentMonth}
//                 prevMonth={prevMonth}
//                 nextMonth={nextMonth}
//             />
//             <RenderCells
//                 currentMonth={currentMonth}
//                 info = {infoData}
//             />
//         </div>
//     );
// };
// export default Calendar;