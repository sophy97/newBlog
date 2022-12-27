// posts 리듀서 > 포스트들의 리스트를 출력해주는 공간
// 이후 > /post/:id 페이지에서 각 포스트의 상세 내용을 조회한다

// like: 좋아요 누른 사람 리스트를 초기값으로 작성할 수도 있음
const initialState = [
    {
        postId:1,
        userName:"seo",
        userEmail:"seophia97@gmail.com",
        title:"첫 게시글",
        content:"첫 게시글의 내용! 문자열",
        view: 0,
        like: 0, //좋아요 누른 사람 리스트
    },
    {
        postId:2,
        userName:"John",
        userEmail:"1220@g.com",
        title:"두번째 게시글",
        content:"두번째 게시글내용!",
        view: 0,
        like: 0, 
    },
]

// post개수가 증가할때마다 하나씩 값 올라야 함
// 일단 선언(변하는값:let)
let postId = 3;

// 리듀서함수
function posts (state=initialState, action) {
    switch (action.type) {

        // 변경할값: 포스트 수정과 삭제 , 새 포스트값 받아와서 id부여 후 추가
        case "deletePost" :
            // 삭제 : 현재 게시글 id찾아서 그것만 제외하고 새 배열을 만듦(filter()) > 그 내용을 return에 전달
            // action.payload로 현재 게시글 id 들고와서 게시물의 postId와 비교
            const newPostList = state.filter((posts)=>( posts.postId != action.payload ))
            return newPostList;
        case "modifyPost" :
            // 수정된 post값 들고와서, 그 값을 통으로 리스트에 바꿔 넣어주기
            // 배열 개수 바뀌지 않고, 안에 값만 수정 : map사용
            // > 수정할 id값과 비교해서 해당 post값을 수정해서 넣기
            const modifiedPost = state.map(
                (posts)=>
                (posts.postId == action.payload.postId ? action.payload : posts))
            return modifiedPost;
        case "addPost" :
            // 새 포스트값 받아와, postId를 부여 후에
            // > 기존 배열(posts state)에 concat으로 추가
            // action.payload에 담을 값들 - userEmail, title, content
            // 리덕스에서 - postId, view, like값들
            const newPost ={
                ...action.payload,
                postId : postId,
                view:0, like:0
            }
            postId++;
            return state.concat(newPost);
        case "updateView" :
            // 같은 postId값이라면 나머지값은 그대로, view만 +1 해준다
            return state.map((posts)=>( 
                posts.postId == action.payload 
                ? ({...posts, view:posts.view+1})
                : (posts) ));
        default :
            return state;
    }
}

// 리듀서 액션함수 생성
export const deletePost =(id)=>({ type:"deletePost", payload:id });
export const modifyPost =(posts)=>({ type:"modifyPost", payload:posts });
export const addPost =(posts)=>({ type:"addPost", payload:posts });
export const updateView =(id)=>({ type:"updateView", payload:id });



export default posts;