/* 맨 처음 홈 화면에 보여줄 네비게이션 링크들 */
import { Container, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { userLogout } from '../modules/currentUser';
// 페이지 내 네브바와 같은 폰트 적용 (Home.css)

const HomeNav = () => {
    
    // 리덕스의 state값을 가져와서 확인 > useSelector로 값 선택해서 가져온다
    // currentUser.js의 전체 state값 까지 접근: "user"
    const user = useSelector((state)=>(state.currentUser));
    // currentUser.js에서 만든 액션함수 불러오기 위한 dispatch
    const dispatch = useDispatch();

    return ( 
        <div className='Home_Link'>
            {
                user ? 
                /** 로그인된 유저가 볼 화면 */
                (
                <Navbar expand="lg" style={{borderRadius:'10px'}} >
                <Container>
                    <Link to='/posts'>포스트</Link>
                    <Link to='/mypage'>마이페이지</Link>
                    <Link to='/guest'>방명록</Link>
                    <Link onClick={()=>{
                                dispatch(userLogout());
                                alert("로그아웃 되었습니다")}}> 로그아웃</Link>
                </Container>
                </Navbar>
                )
                :
                /** 로그인하지 않은 유저가 볼 화면 */
                (
                <Navbar expand="lg" style={{borderRadius:'10px'}} >
                    <Container>
                        <Link to='/posts'>포스트</Link>
                        <Link to='/about'>소개</Link>
                        <Link to='/guest'>방명록</Link>
                        <Link to='/loginform'>로그인</Link>
                    </Container>
                </Navbar>
                )
            }
        </div>
    );
}

export default HomeNav;