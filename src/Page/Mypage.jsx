import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from "react-redux";
import "../css/Mypage.css";

const Mypage = () => {

    // auth로그인된 유저 정보 가져오기
    const user = useSelector((state)=>(state.currentUser));
    // userInfoList 모듈 -배열 중 하나의 값만 들고오기 (.find(조건))
    const userInfo = useSelector((state)=>(state.userInfoList)
                    .find((info)=>(info.userEmail === user.email)))

    return ( 
        <Container>
        <Row>
            <Col>
                <p>유저 이메일 : {userInfo.userEmail}</p>
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