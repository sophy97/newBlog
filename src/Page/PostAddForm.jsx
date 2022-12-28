/** 포스트 작성form
 *  만들어둔 수정 form 복사해서 useLocation제외하고 폼 만듦 */
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPost } from "../modules/posts";
// Toast ui > Editor's Style & Editor
import '@toast-ui/editor/dist/toastui-editor.css'; 
import Editor from "@toast-ui/editor";


const PostAddForm = () => {
    // +토스트에디터 직접 들고오기 (첫 렌더시 사용)
    // (toastui wrapper는 버전 에러로 사용하지 않는다)
    useEffect(()=>{
            const editor = new Editor({
            el: document.querySelector('#editor'),
            height: '500px',
            initialEditType :"wysiwyg",
            hideModeSwitch: true,
            initialValue : "포스트 내용을 작성하세요"
        })
        editor.getMarkdown();
    },[]);
    
    
    // toastUI에서 값을 가져오기 위해 ref 사용
    const editorContent = useRef();
    // 값 들고왔는지 출력해서 확인해보기
    useEffect(()=>{
        console.log(editorContent.current.lastChild.lastChild)
    })


    // 로그인 값 들고오기 *(auth에서 들고온 로그인유저 이메일값)
    const userEmail = useSelector((state)=>(state.currentUser.email));

    // 새로운 포스트를 담을 공간 (초기값 객체형태 맞춰두기)
    // 미리 객체형식임을 작성해두면, 빈값인 경우 undefined 나옴
    // 로그인된 유저의 이메일을 초기값으로 지정해두기
    const [posts, setPosts] = useState({ userEmail });

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
        setPosts({...posts, [e.target.name]: e.target.value});
    }


    return ( 
        <div>
            {/* postid는 작성 후에 부여함 */}
            <Container>
                <Row className="mb-3">
                    <Col>작성자: {posts.userEmail}</Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Control
                        name="title" value={posts.title} onChange={(e)=>{onChanage(e)}}>
                        </Form.Control>
                    </Col>
                </Row>
                {/* toast ui로 textarea 대체하기 */}
                <Row>
                    <Col>
                        <div id="editor" ref={editorContent}
                        name="content" onChange={(e)=>{onChanage(e)}}>
                        {posts.content}
                        </div>
                    </Col>
                </Row>
                {/* <Row className="my-4">
                    <Col>
                    <textarea name="content" onChange={(e)=>{onChanage(e)}}>
                        {posts.content}
                    </textarea>
                    </Col>
                </Row> */}

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