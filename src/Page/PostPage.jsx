/** 포스트를 출력하는 페이지 */
import { useEffect, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addComment } from "../modules/comments";
import posts, { deletePost, updateView } from "../modules/posts";


const PostPage = () => {
// params을 통해서 board의 boardId값 전달
const {id} = useParams();
// board의 내용을 출력하기위해 리덕스에서 값 가져오기
const postList = useSelector((state)=>(state.posts));

// board의 내용중에 하나만 찾아서 가져오기
// 배열의 find( return 값 : 배열값중 하나만 출력)
const posts = postList.find((posts)=>(posts.postId == id))

// useSeletor를 이용해서 가져올때 바로 find 사용하기.
//const postFind = useSelector((state)=>(state.posts.find((posts)=>(posts.postId == id))) )
//액션함수 들고오기위한 dispatch
const dispatch = useDispatch();


// 화면 실행되자마자 한번만 실행 (조회수 +1)
useEffect(()=>{
    //리덕스를 통해 id값(params라서 string임)을 전달 > 그 id값 가진 post값의 view를 +1
    dispatch(updateView(id))
},[])


return ( 
    <div>
        <p>{posts ? <PrintPost posts={posts} /> : "없는 페이지입니다"}</p>
    </div>
    );
}

export default PostPage;




// PrintPost 컴포넌트
// 위에 출력할 ui를 따로 컴포넌트로 빼두기
const PrintPost =({posts})=> {

    // 사용할 컴포넌트에 들고오기! (import된 공간은 맨위 > 전체 사용 가능)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // state 만들어서 전달하기
    const [commentText, setCommentText] = useState("");
    
    // userEmail을 가져오기 위해 selector
    const userEmail = useSelector((state)=>(state.currentUser.email));


    // commentInput의 버튼에 들어갈 함수 (눌러서 댓글 추가)
    const onAddComment =()=>{
        //리덕스를 사용해서 그 값을 전달 > postId, userEmail, commentText
        // 후 액션함수 불러와서 새값 전달
        dispatch(addComment(
            {
                postId:posts.postId,
                userEmail:userEmail,
                text:commentText,
            }
        ))
        // + commentText값 비워주기
        setCommentText("");
    }

    // +comments값 들고오기 (useSelector로)
    const comments = useSelector((state)=>(state.comments));
    // filter(): 조건return값이 true인 것만 뽑아 새 배열
    const postComments = comments.filter(
        (comment)=>(comment.postId == posts.postId)
    );
    
    // 게시글 삭제 함수
    // 삭제할 게시글(클릭한거) id값 전달받아서 dispatch로 액션함수 연결 > 삭제
    const onDeletePost =(id)=> {
        dispatch(deletePost(id));
        alert("삭제되었습니다");
        navigate('/posts');
    }
    // 게시글 수정 함수
    // 수정할 게시글(클릭한거) id값 전달받아 navigate(이동주소,옵션)로 수정 페이지로 이동
    const toModifyPost =()=> {
        navigate('/posts/modifyform', {state:posts})
    }

    return (
        <Container>
            <Row>
                <Col xs={1}>{posts.postId}</Col>
            </Row>
            <Row>
                <Col><h2>{posts.title}</h2></Col>
                <Col>
                    <Button onClick={()=>{toModifyPost(posts)}}>수정</Button>
                    <Button onClick={()=>{onDeletePost(posts.postId)}}>삭제</Button>
                </Col>
            </Row>
            <Row>
                <Col>작성자: <b>{posts.userEmail}</b></Col>
            </Row>
            <Row className="my-4">
                <Col>{posts.content}</Col>
            </Row>
            <Row>
                <Col>조회수{posts.view}</Col>
                <Col>좋아요{posts.like}</Col>
            </Row>
            <hr />
            <Row>
                <Col>
                {/* 아래 코멘트 등록 폼으로 값 전달하기 */}
                <CommentInput commentText={commentText} setCommentText={setCommentText} onAddComment={onAddComment} />
                </Col>
            </Row>
            <Row>
                {/**코멘트에서 postId가 같은 것만 출력한다
                 *  초기값이 null or undefined일때, 그대로 사용 가능하지만
                 *  초기값이 배열이라면, 배열의 길이를 이용해 비었는지 확인해줘야 한다
                 * (+초기값이 객체라면, 속성값으로 들어가 확인)
                 * */ }
                    {
                        postComments.length > 0 
                        ? (postComments.map((comment)=>(
                        <div>
                            <b>{comment.userEmail}</b> {" : "}
                                {comment.text}
                        </div>))) 
                        : (<p>댓글이 없습니다</p>)
                    }

            </Row>

        </Container>
    );
}


// 댓글을 등록하는 폼 
function CommentInput(props) {
    const {commentText, setCommentText, onAddComment} = props;
    return (
    <>
        <FloatingLabel controlId="floatingTextarea2" label="Comments">
            <Form.Control as="textarea" placeholder="댓글을 남겨보세요" style={{ height: '100px' }}
            value={commentText} 
            onChange={(e)=>{setCommentText(e.target.value)}} />
        </FloatingLabel>
        <button onClick={onAddComment}>댓글 등록</button>
    </>
    );
}