// 좋아요 기능 구현을 위한 [유저의 정보] 보관
/**
 * 구글인증에서 가져온 이메일과 저장된 이메일 비교해서
 * like값을 저장하거나 가져올 수 있도록 하는 리덕스 모듈
 * */ 

//초기값
const initialState = [
    { 
        userEmail : "seophia97@gmail.com",
        like : [], // 여러개 posts의 id와 title을 가진 객체들이 들어올 공간
    }
]

//리듀서
function userInfoList (state=initialState, action) {
    switch (action.type) {
        case "addUserInfo" :
            // email:payload로 받아오고, like=[] 생성
            const newUser ={
                userEmail :action.payload,
                like:[],
            }
            return state.concat(newUser);
        case "addLikePost" :
            // post의 좋아요 버튼을 눌렀을 때, 값을 확인 (연결된 값 2개)
            // 1. userInfoList의 like >> user가 좋아요 누른 리스트 : postId, title배열
            // 2. post의 like >> userEmail 배열에 추가 (??)
            
            // concat에 붙일 새 객체 
            const newAddLike ={
                postId : action.payload.postId,
                title : action.payload.title,
            }
            // userEmail이 동일한 것으로 연결 << 배열의 값 수정해서 사용
            return state.map((userInfo)=>(
                userInfo.userEmail == action.payload.userEmail
                ? 
                {   ...userInfo,
                // like속성은 userInfo.like에서 값을 찾은 후,
                // 값이 존재한다면 이전값을 넣고, 없다면 추가한 값을 넣도록 삼항연산자 사용
                    like: userInfo.like.find(
                        (postLike)=>(postLike.postId == action.payload.postId)
                        ) 
                        ? userInfo.like 
                        : userInfo.like.concat(newAddLike)
                }
                : userInfo
            ));

        default :
            return state;
    }
}

//액션함수 생성 내보내기
export const addUserInfo =(email) =>({type:"addUserInfo", payload:email});
export const addLikePost =(likepost)=>({type:"addLikePost", payload:likepost});

//리듀서함수 내보내고 모듈(modules > index)에 연결
export default userInfoList;
