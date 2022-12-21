/** 포스트를 출력하는 페이지 */
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import posts, { deletePost } from "../modules/posts";


const PostPage = () => {
// params을 통해서 board의 boardId값 전달
const {id} = useParams();
// board의 내용을 출력하기위해 리덕스에서 값 가져오기
const postList = useSelector((state)=>(state.posts));

// board의 내용중에 하나만 찾아서 가져오기
// 배열의 find( return 값 : 배열값중 하나만 출력)
const posts = postList.find((posts)=>(posts.postId == id))

// useSeletor를 이용해서 가져올때 바로 find 사용하기.
const postFind = useSelector((state)=>(state.posts.find((posts)=>(posts.postId== id))) )

return ( 
    <div>
        <p>{posts ? <PrintPost posts={posts} /> : "없는 페이지입니다"}</p>
    </div>
    );
}

export default PostPage;






// 위에 출력할 ui를 따로 컴포넌트로 빼두기
const PrintPost =({posts})=> {

    // 사용할 컴포넌트에 들고오기! (import된 공간은 맨위 > 전체 사용 가능)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
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
                <Col>{posts.userName}/{posts.userEmail}</Col>
            </Row>
            <Row className="my-4">
                <Col>{posts.content}</Col>
            </Row>
            <Row>
                <Col>조회수{posts.view}</Col>
                <Col>좋아요{posts.like}</Col>
            </Row>
        </Container>
    );
}