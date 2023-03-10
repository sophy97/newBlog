import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../css/Posts.css";


const Posts = () => {

    // 리덕스에 있는 posts.js 모듈 들고오기
    const postList = useSelector((state)=>(state.posts));
    // 포스트작성을 위해 로그인 여부 들고오기 (currentUser.js모듈)
    // user값이 존재하면 글쓰기 버튼 on / 아니면 off
    const user = useSelector((state)=>(state.currentUser));

    // navigate로 세부페이지 연결 만들기
    const navigate = useNavigate();

    // 게시물 이름 클릭시 실행할 내용 함수로 만들기
    const toPostPage =(id)=> {
        // 각 포스트의 id값으로 이동하기 위해 boardId를 id로 받아옴
        navigate(`/posts/${id}`);
    }


    return ( 
        <div>
            <div style={{textAlign:"end"}}>
                {
                    user ? 
                    (<button className="addpost-btn" onClick={()=>{navigate('/posts/addform')}}>포스트 작성</button>)
                    :
                    (<Link to='/loginform'>로그인하여 포스트 작성하기</Link>)
                }
            </div>
            <br />
            <Table striped>
                <thead>
                    <tr className="posts-table">
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {postList.map((posts)=>(
                        <tr key={posts.postId}>
                            <td>{posts.postId}</td>
                            <td onClick={()=>{toPostPage(posts.postId)}}>{posts.title}</td>
                            <td>{posts.userEmail}</td>
                            <td>{posts.view}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}


export default Posts;