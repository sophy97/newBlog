/** 포스트 작성form
 *  수정 form 따와서 useLocation 버리고 폼 만듦
 *  Route 주소: '/posts/modifyform'
 *  수정 후 수정완료 버튼 연결해서 바뀐값 업데이트 해주기
*/
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPost } from "../modules/posts";



const PostAddForm = () => {

    // 새로운 포스트를 담을 공간 (초기값 객체형태 맞춰두기)
    // 미리 객체형식임을 작성해두면, 빈값인 경우 undefined 나옴
    const [posts, setPosts] = useState({});

    // 로그인 값 들고오기
    const userEmail = useSelector((state)=>(state.currentUser.userEmail));
    console.log(userEmail);

    // 리덕스에서 들고오고, 라우터로 페이지 이동
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 포스트 작성(내용추가) 버튼 누르면 실행되는 함수
    const onAddPost =()=>{
        dispatch(addPost(posts));
        navigate(`/posts/`)
    }


    // 값 수정시 post내용 수정하는 함수
    const onChanage = (e) => {
        setPosts({...posts, [e.target.name]:e.target.value});
    }

    return ( 
        <div>
            {/* postid는 작성 후에 부여함 */}
            <Container>
            <Row>
                <Col>
                <input name="title" value={posts.title} 
                onChange={(e)=>{onChanage(e)}}></input>
                </Col>
            </Row>
            <Row>
                <Col><input type="text">작성자</input></Col>
            </Row>
            <Row className="my-4">
                <Col>
                <textarea name="content" onChange={(e)=>{onChanage(e)}}>
                    {posts.content}
                </textarea>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button size="sm" variant="outline-secondary" onClick={()=>{navigate('/posts')}}>취소</Button> {" "}
                    <Button variant="outline-primary" onClick={onAddPost}>작성완료</Button>
                </Col>
            </Row> 
                
            </Container> 
        </div>
    );
}

export default PostAddForm;