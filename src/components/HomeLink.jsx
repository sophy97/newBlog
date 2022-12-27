/* 이거 드롭다운으로 내용 옮기기*/

import { Container, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { userLogout } from '../modules/currentUser';
const HomeLink = () => {
    
    // 리덕스의 state값을 가져와서 확인 > useSelector로 값 선택해서 들고옴
    // currentUser.js의 전체 state값 까지 접근: "user"
    const user = useSelector((state)=>(state.currentUser));
    // currentUser.js에서 만든 액션함수 불러오기 위한 dispatch
    const dispatch = useDispatch();

    return ( 
        <div className='Home_Link'>
            {
                user ? 
                /**로그인했을때 보이는 화면, 
                 * 단 관리자페이지는 홈페이지 주인만 */
                (
                <Navbar expand="lg" style={{borderRadius:'10px'}} >
                <Container>
                    <Link to='/posts'>포스트</Link>
                    <Link to='/guest'>방명록</Link>
                    <Link>관리자페이지</Link>
                    <Link to='/mypage'>마이페이지</Link>
                    <Link onClick={()=>{
                        dispatch(userLogout());
                        alert("로그아웃 되었습니다")}}>로그아웃</Link>
                </Container>
                </Navbar>
                )
                :
                /** 로그인되어있지 않을때 보여지는 링크 */
                (
                <Navbar expand="lg" style={{borderRadius:'10px'}} >
                    <Container>
                        <Link to='/posts'>포스트</Link>
                        <Link to='/guest'>방명록</Link>
                        <Link to='/loginform'>로그인</Link>
                        <Link to='/about'>소개</Link>
                    </Container>
                </Navbar>
                )
            }

        </div>
    );
}

export default HomeLink;