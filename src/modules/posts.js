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
        like: 1, //좋아요 누른 사람 리스트
    },
    {
        postId:2,
        userName:"John",
        userEmail:"1220@g.com",
        title:"두번째 게시글",
        content:"두번째 게시글내용!으악으악",
        view: 0,
        like: 1, //좋아요 누른 사람 리스트
    },
]

// post개수가 증가할때마다 하나씩 값 올라야 함
// 일단 선언(변하는값:let)
let postId = 3;

// 리듀서함수
function posts (state=initialState, action) {
    switch (action.type) {

        // 변경할값: 포스트 수정과 삭제
        // 삭제 : 현재 게시글 id찾아서 그것만 제외하고 새 배열을 만듦(filter()) > 그 내용을 return에 전달
        case "deletePost" :
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
        default :
            return state;
    }
}

// 리듀서 액션함수 생성
export const deletePost =(id)=>({ type:"deletePost", payload:id });
export const modifyPost =(posts)=>({ type:"modifyPost", payload:posts });



export default posts;