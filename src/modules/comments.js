/**댓글 state를 관리하는 모듈*/

//초기값
const initialState =[ 
    {
        commentId:1,
        postId:1,
        userEmail:"seophia97@naver.com",
        text:"포스트1 첫댓글!",
    },
    {
        commentId:1,
        postId:2,
        userEmail:"new@naver.com",
        text:"포스트2의 처음 댓글!",
    }
]

// commentId 관리하기 
// (initialState바깥에) -> js파일에서 사용하는 값
let commentId = 3;

//리듀서함수
// 댓글 추가,
function comments (state=initialState, action) {
    switch(action.type) {
        case "addComment" :
            const newComment ={
                ...action.payload,
                commentId: commentId,
            }
            commentId++;
            //concat은 값을 덧붙인 새로운 배열을 만듦 > 바로state에 붙여줌
            return state.concat(newComment);

        default :
            return state;
    }
}

// 액션함수 만들어 내보내기
export const addComment =(comment)=>({type:"addComment", payload:comment})


// rootReducer로 값 전달 (modules > index.js)
export default comments;