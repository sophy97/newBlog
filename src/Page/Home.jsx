import { useEffect, useMemo } from "react";
import { useState } from "react";
import Slider from "react-slick";
import '../css/Home.css';
import HomeNav from '../components/HomeNav';

const Home = () => {
    // 현재 시간 출력
    // new Date(); 로 js date객체가 하나 생성됨 : (빈값)이면 현재시간으로 객체 생성됨 > 메서드도 그대로 사용가능
    const [time, setTime] = useState(new Date());

    // 현재 페이지 실행 시(mount), 시간이 알아서 바뀌게 하려면
    // setInterval 사용하여 1초마다 새로 render 한다 (useEffect)
    // setInterval은 한번만 진행(useEffect 마지막인자 빈배열)
    useEffect(()=>{
        // setInterval : 반복할 함수, 반복할 초단위(ms)로 두개의 인자를 받는다
        setInterval(()=>{setTime(new Date())}, 1000);
    },[]);
    

    // 글귀나 명언 출력
    // 여러개[{},{}..]:배열 안 객체형태 중 랜덤 선택해서 출력할 예정
    const [words, setWords] = useState([
        {text:"You must do the things you think you cannot do", author:"Eleanor Roosevelt"},
        {text:"The Future depends on what you do today", author:"Mahatma Gandhi"},
        {text:"Life has no limitations, except the ones you make", author:"Les Brown"},
        {text:"Love seems the swiftest, but it is the slowest of all growths", author:"Mark Twain"},
        {text:"Victory is sweetest when you've known defeat", author:"Malcolm S.Forbes"},
    ]);
    

    // 시계내용 출력 함수 : return값으로 시간을 돌려줌 - `문자열` ($변수)
    const printClock =() => {
        // 숫자->문자로(String), 문자객체에 있는 0을 채우는 메서드 사용 00:00형태
        // padStart(최대길이(2),채울값(0))을 만들어 변수로 > return에서 쓰삼
        const hour = String(time.getHours()).padStart(2,"0");
        const min = String(time.getMinutes()).padStart(2,"0");
        const second = String(time.getSeconds()).padStart(2,"0");
        return `${hour} : ${min} : ${second}`;
    }

    // 글귀 랜덤 출력 함수 : 
    // 문제! 이렇게만 처리하면, printWord가 1초마다 실행돼서 random값 update됨
    // >> 왜 실행? 이 함수가 return의 html안에 있으니까
    // >>> 따라서 이 함수를 고정하려면 : useCallback or useMemo를 사용 > return값 고정
    // 여기서는 return값 고정 위해, useMemo(); 사용 / 변수안에 return값
    const printWord = useMemo (()=>{
        //js함수 중 Math.random 사용 > 0~1사이 소수 추출함. 
        // 사용하려면 정수값으로: Math.floor > words배열 길이만큼의 범위가 자동 추출
        const randomnum = Math.floor(Math.random()*words.length);
        return words[randomnum];
    },[]);

    // 슬릭 화면 사용
    // https://react-slick.neostack.com/docs/api 속성 확인하고 커스텀
    const settings = {
        arrows: false,
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    // 슬릭 배경이미지 배열 (map출력을 위함)
    const [imgList, setImgList] = useState([
        "backg_1.jpg",
        "backg_2.jpg", 
        "backg_3.jpg", 
        "backg_4.jpg",
    ]);



    return (
        <div>
            <>  
            {/* 슬릭 출력될 화면 */}
                <Slider {...settings}>
                {/* slider는 내용이 커지면 다음 페이지에 넘어감
                    따라서 크기 지정해서 사용
                    이미지 주소로 바로 접근 불가 > require사용해서 이미지 주소 지정 */}
                {/* map으로 출력 위해 > 배열값 필요 */}
                    {
                        imgList.map((img, idx)=>(
                        <div key={idx}>
                            <div style={{
                                    width:"100%", height:"65vh",
                                    backgroundImage :'url('+require("../img/"+img)+')',
                                    backgroundSize:"cover" }}>
                            </div>
                        </div>
                        ))
                    }
                </Slider>
                <HomeNav />
                <div className="Home_main">
                    {/* 현재 시간 출력 > 함수 결과값 바로 실행 */}
                    <h1>{printClock()}</h1>
                    {/* 배열 안 {명언}중 하나를 출력 */}
                    {/* useMemo사용한 경우, 그 함수의 return값이 
                        변수 안에 존재 > 따라서 사용할 때 함수실행X, 변수이름으로만 사용함 */}
                        <div className="quote-txt">
                            <h2>{printWord.text}</h2>
                            <p>{printWord.author}</p>    
                        </div>
                </div> 
            </>
        </div>
    );
}

export default Home;