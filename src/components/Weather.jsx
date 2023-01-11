// 도시이름 입력받아 현재 날씨를 출력하는 컴포넌트
// 라이브러리 (axios / styled-components )사용
// api : https://openweathermap.org/api 의 
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Weather = () => {
    // js처리방식 : 위>아래 라서 url과 ( 받아온 키값, 위치값) 순서가 중요함
    const API_KEY = "df39660fc891b75f918b22159e9ad35e";
    const [location, setLocation] = useState('');
    const [result, setResult] = useState({});

const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units
            =&lang=kr&appid=${API_KEY}`;


const searchWeather = async(e) => {
    if(e.key === 'Enter') {
        try {
            const data = await axios ({
                method :'get',
                url:url
            })
        console.log(data);
        setResult(data);
        } catch(err) {
            alert(err);
        }
    }
}

    return ( 
        <WeatherWrap>
            <div className="weatherContentWrap">
                <br />
                <h4 style={{fontSize:"30px"}}> weather 🌤 <span style={{color:'red',fontSize:'20px'}}>now</span></h4>
                <br />
                <input placeholder="도시(eng) > enter" 
                type="text" onKeyDown={searchWeather}
                value={location} onChange={(e)=>{setLocation(e.target.value)}}
                />
                {
                    Object.keys(result).length !== 0 && (
                    <ResultWrap>
                        <div className="city">📍 :  {result.data.name}</div>
                        <div className="temperature">
                        🌡 : 
                        {Math.round(((result.data.main.temp - 273.15) * 10)) / 10 }˚C
                        </div>
                        <div className="sky">
                        {/* '즉시발동함수'를 통해 jsx{}에서 중첩조건문 사용 */}
                        {
                            (function(){
                                if(result.data.weather[0].main === 'Clear'){
                                    return (" 🌞 ")
                                } else if (result.data.weather[0].main === 'Mist') {
                                    return (" ⛅ ")
                                } else if (result.data.weather[0].main === 'Rain') {
                                    return (" ☔ ")
                                } else if (result.data.weather[0].main === 'Clouds') {
                                    return (" ☁️ ")
                                } 
                            })()
                        }
                        {result.data.weather[0].main}
                        </div>                
                    </ResultWrap>
                    )
                }
            </div>
        </WeatherWrap>
        
    );
}

export default Weather;


// styled components 사용
const WeatherWrap = styled.div`
    margin-left:40px;
    width:300px;
    height:30vh;
    margin-top:5vh;
    margin-bottom:5vh;
    background-color:white;
    border-radius:8px;
    .weatherContentWrap {
        margin-top:20px;
        margin-bottom:10px;
    }
    .weatherContentWrap > input {
        width:250px;
        padding:2px;
        border:1px solid whitesmoke;
        border-radius: 8px;
    }
    .weatherContentWrap > input:focus {
        border:none;
        background-color: whitesmoke;
    }
`;

const ResultWrap = styled.div`
    text-align:center;
    margin-top:25px;
    padding:10px;
    width:250px;
    border:3px solid lightgray;
    border-radius:8px;
`;