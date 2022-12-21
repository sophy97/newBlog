/** 포스트 작성 폼 +(수정도 여기서)
 *  Route 주소: '/posts/modifyform'
 *  수정 후 수정완료 버튼 연결해서 바뀐값 업데이트 해주기
*/
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { modifyPost } from "../modules/posts";





const PostWriteForm = () => {

    const location = useLocation();
    const [posts, setPosts] = useState(location.state);

    // 리덕스에서 들고오고, 라우터로 페이지 이동
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 포스트 수정완료 버튼 누르면 실행하는 함수
    const onModifyPost =()=>{
        dispatch(modifyPost(posts));
        navigate(`/posts/${posts.postId}`)
    }


    // 값 수정시 post내용 수정하는 함수
    const onChanage = (e) => {
        setPosts({...posts, [e.target.name]:e.target.value});
    }

    return ( 
        <div>
            <Container>
            <Row>
                <Col>{posts.postId}</Col>
            </Row>
            <Row>
                <Col><input name="title" value={posts.title} 
                onChange={(e)=>{onChanage(e)}}></input></Col>
                <Col>
                    <Button onClick={onModifyPost}>수정완료</Button>
                </Col>
            </Row>
            <Row>
                <Col>{posts.userName}/{posts.userEmail}</Col>
                
            </Row>
            <Row className="my-4">
                <Col>
                <textarea name="content" onChange={(e)=>{onChanage(e)}}>
                    {posts.content}
                </textarea>
                </Col>
            </Row>
            </Container> 
        </div>
    );
}

export default PostWriteForm;