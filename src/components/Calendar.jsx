// 소개(About) 페이지에 달력 표시하는 컴포넌트 (moment.js 라이브러리 사용)

import {useState} from 'react';
import moment from 'moment';

const Calendar = () => {
    const [getMoment, setMoment] = useState(moment());

    const today = getMoment;  
    const firstWeek = today.clone().startOf('month').week();
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

    const calendarArr =() => {
        let result = [];
        let week = firstWeek;
        for ( week; week <= lastWeek; week++) {
            result = result.concat (
            <tr key={week}>
            {
            Array(7).fill(0).map((data, index) => {
            let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
            if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
                return(
                    <td key={index} style={{border:'2px solid red', borderRadius:"5px"}} >
                        <span>{days.format('D')}</span>
                    </td>
                );
            } else if (days.format('MM') !== today.format('MM')){
                return(
                    <td key={index} style={{color:'lightgray'}} >
                        <span>{days.format('D')}</span>
                    </td>
                );
            } else {
                return(
                    <td key={index}  >
                        <span>{days.format('D')}</span>
                    </td>
                    );
                }
            })
            }
            </tr>
            );
        }
        return result;
    }

    return ( 
        <div className='cal-box'>
            <div className="cal-control">
                <span style={{fontSize:"20px"}} onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'month')) }}> ◀ </span>
                <span><b style={{fontSize:"20px"}}>{today.format('YYYY / MM ')}</b></span>
                <span style={{fontSize:"20px"}} onClick={()=>{ setMoment(getMoment.clone().add(1, 'month')) }} > ▶ </span>
            </div>
            <br />  
            <table className='cal-table'>
                <tbody>
                {calendarArr()} 
                </tbody>
            </table>
        </div>
    );
}

export default Calendar;