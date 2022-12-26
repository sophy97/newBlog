/** 블로그 소개 About 페이지
 * 로그인 x - about페이지 
 * 로그인 o - 위에 마이페이지 컴포넌트 띄우고 아래 소개내용
 */
import "../css/About.css"
import { Col, Container, Row } from "react-bootstrap";


const About = () => {
    return ( 
        <>
        <div className="video-box">
            <video autoPlay muted loop src="write.mp4"
            style={{width:'100%', height:'auto', alignContent:'center'}}>
            </video>
        </div>
        <Container>
            <Row>
                <Col>Home</Col>
                <Col>2 of 2</Col>
            </Row>
            <Row>
                <Col>1 of 2</Col>
                <Col>2 of 2</Col>
            </Row>
            <Row>
                <Col>1 of 2</Col>
                <Col>2 of 2</Col>
            </Row>
            <Row>
                <Col>1 of 2</Col>
                <Col>2 of 2</Col>
            </Row>
        </Container>
        </>
    );
}

export default About;