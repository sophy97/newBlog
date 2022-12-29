/** 포스트 수정 form
 *  Route 주소: '/posts/modifyform'
 *  수정 후 수정완료 버튼 연결해서 바뀐값 업데이트 해주기
*/
import Editor from "@toast-ui/editor";
import '@toast-ui/editor/dist/toastui-editor.css'; 
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { modifyPost } from "../modules/posts";



const PostWriteForm = () => {

    const location = useLocation();
    const [posts, setPosts] = useState(location.state);

    // 로그인 값 들고오기
    const user = useSelector((state)=>(state.currentUser));
    // toastUI에서 값을 가져오기 위해 ref 사용
    const editorContent = useRef();
    // + toast 에디터의 값 받아올 공간 state
    const [content, setContent] = useState("")

    // 리덕스에서 들고오고, 라우터로 페이지 이동
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 포스트 수정완료 버튼 누르면 실행하는 함수
    const onModifyPost =()=>{
        // + toast에디터로부터 받은 값을 따로 가져와 포스트수정 
        dispatch(modifyPost({
            ...posts,
            content: content,
        }
            ));
        navigate(`/posts/${posts.postId}`)
    }

    // +토스트에디터 직접 들고오기 (첫 렌더시 사용)
    // (toastui wrapper는 버전 에러로 사용하지 않는다)
    useEffect(()=>{
        const editor = new Editor({
        el: document.querySelector('#editor'),
        height: '500px',
        initialEditType :"wysiwyg",
        hideModeSwitch: true,
        initialValue : "포스트 내용을 작성하세요",
        events: {
            change: onChangeEditor 
        },
    })
},[]);


    // 값 수정시 post내용 수정하는 함수 
    const onChanage = (e) => {
        setPosts({...posts, [e.target.name]:e.target.value});
    }
    // + toast에디터에 값 넣기위한 함수
    const onChangeEditor =()=>{
        setContent (editorContent.current.firstChild.firstChild.nextSibling.lastChild
        .lastChild.lastChild.lastChild.innerHTML);
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
                <Col>{user.userName}/{user.userEmail}</Col>
            </Row>
            {/* toast ui로, 기존 만들어둔 textarea 대체하기 */}
            <Row>
                <Col>
                    <div id="editor" ref={editorContent} onChange={(e)=>{onChanage(e)}}>
                    </div>
                </Col>
            </Row>
        </Container> 
        </div>
    );
}

export default PostWriteForm;