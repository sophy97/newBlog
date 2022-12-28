
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../css/FixedComp.css";

function PageNav() {

    // 로그인한 유저 정보 가져오기
    const user = useSelector((state)=>(state.currentUser));

    return (
        <Navbar bg="light" expand="md">
        <Container className='pg-link'>
            {/* 기존 연결된 a태그들 Link to로 바꿔 연결 */}
            <Navbar.Brand>
                <Link to='/' className="navbar-brand"> 🎨Lets LOG </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Link to="/about" className='nav-link'>소개</Link>
                <Link to="/posts" className='nav-link'>포스트</Link>
                <Link to="/guest" className='nav-link'>방명록</Link>
                {   user 
                    ? 
                    <Link to="/mypage" className='nav-link'>마이페이지</Link>
                    :
                    <Link to="/loginform" className='nav-link'>로그인</Link>
                }
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default PageNav;