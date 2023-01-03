import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from "react-redux";
import "../css/Mypage.css";

const Mypage = () => {

    // auth로그인된 유저 정보 가져오기
    const user = useSelector((state)=>(state.currentUser));
    // 프로필 영역 
    const [show, setShow] = useState(false);
    // userInfoList 모듈 -배열 중 하나의 값만 들고오기 (.find(조건))
    const userInfo = useSelector((state)=>(state.userInfoList)
                    .find((info)=>(info.userEmail === user.email)))

    return ( 
        <Container>
        <Row>
            <Col>
                <p>유저 이메일 : {userInfo.userEmail}</p>
                <div  className="userimg_box">
                { userInfo.userEmail ? 
                <div
                onClick={()=>{setShow(true)}}
                style={{
                    width:"150px", height :"150px", 
                    backgroundImage: `url(${userInfo.userPro}) `,
                    backgroundPosition:"center",
                    backgroundRepeat:"no-repeat",
                    backgroundSize:"130px",
                    borderRadius:"50%",
                    border: "1px solid #ccc"
                    }}>
                </div>
                : 
                <img className="userimg" style={{borderRadius:"50%"}} 
                onClick={()=>{setShow(true)}} src={`${process.env.PUBLIC_URL}/images/user.png`} alt="유저이미지" />
}     
                </div>
            </Col>
            <Col className='likelist'>
                <h5> <span className='heart'>❤</span> 게시글 목록 </h5>
                <ul>
                    {
                        userInfo.like.map((l)=>(
                        <li key={l.postId}>{l.title}</li>
                        ))
                    }
                </ul>
            </Col>
        </Row>
    </Container>
    );
}

export default Mypage;