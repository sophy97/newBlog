/** 초기값
 * 로그인여부 알기 위해 초기값 null로 설정
 * 안에 [], {}를 넣어두면 값이 존재한다고 판단하므로
 */
const initialState = null;

// 데이터관리 방법2
// { userinfo: null, login:false }와 같이 객체 안에 속성으로 추가해서 사용
// (*겹쳐지지않게 ...로 들고와 사용)


// 들어갈 리듀서함수의 내용 (초기값,액션값)
// createStore통한 내용은 switch문으로 작성
function currentUser ( state=initialState, action ) {
    switch(action.type) {
        case "userLogin" :
            // 여기서는 비동기 내용은 컴포넌트에서 실행 후에, 리덕스로 들고오고자 함
            // *비동기는 미들웨어(thunk이용)에서 처리하는 방식도 있다*
        // 구글인증을 통해 가져온 값은, '객체' 통해 가져와진다
        // 받아온 값 그대로 넣어주거나, 안의 값들 중 필요한 것만 골라서 넣을 수 있다 
            return action.payload;
        // 로그아웃 > 그 값이 null
        case "userLogout" :
            return null;
        default :
            return state;
    }
}

// 액션함수로 작성
export const userLogin =(user)=> ({ type:"userLogin", payload:user });
export const userLogout =()=> ({ type:"userLogout" });

export default currentUser;
