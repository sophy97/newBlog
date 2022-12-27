// 헤더 영역 > 그 안에 피드백 받을 modalComp 포함
// > 헤더, 푸터는 APP에 바로 넣어둠
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dropdown from './Dropdown';

const Header = () => {
    const [dropdownVisibility, setDropdownVisibility] =useState(false);
    // 모달: 동적 ui 만들기 위한 state
    const navigate = useNavigate();
    
    return (
        <div>
            <div className="header">
            <h1 className='title'>
                <span className="drop-btn" style={{cursor:'pointer'}}
                onClick={()=>{setDropdownVisibility(!dropdownVisibility)}}>
                <FontAwesomeIcon icon={faBars} />
                </span>　
                Let's Log 
                <Dropdown className="drop-box" visibility={dropdownVisibility}>
                    <ul className='dropmenu'>
                        <li onClick={()=>{navigate('/')}}> Home </li>
                        <li onClick={()=>{navigate('/emolog')}}> Emotion Log </li>
                        <li onClick={()=>{navigate('/games')}}> PlayGround </li>
                        <li onClick={()=>{navigate('/mypage')}}> Mypage </li>
                    </ul>
                </Dropdown>
            </h1>
            </div>
        </div>
        );
    }

// 헤더 default 내보내기
export default Header;


