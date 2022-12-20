/** 방명록 페이지의 state 관리
 *  방명록 리스트 저장할 것  */

// 초기값 (여러개 리스트 > 배열 속 객체형태로 작성)
const initialState = [
    {guestId : 1, name:"sophy", text:"첫번째 작성된 방명록"},
    {guestId : 2, name:"익명", text:"두번째 방문자 들렀다 감"},
];
// initialState 밖에, 값을 구분하기 위한 id 선언
// (변해야 하는 값이므로 const대신 let)
let guestId = 3;


// 들어갈 리듀서함수 내용
//toolkit미사용 > switch문으로 직접 지정
function guest (state=initialState, action) {
    switch(action.type) {
        case "addGuest" :
        // 방명록을 리스트에 추가할 것
        // guest.jsx에서 작성한 값(name, text)을 들고와서 리스트에 추가
        // guestId값 추가
        const newGuest = {...action.payload, guestId:guestId }
        guestId++;
        // 만들어진 방명록 객체를 기존 배열에 추가 > 새로 배열을 만들어 추가 : concat() 
        const newGuestArr = state.concat(newGuest);
            return newGuestArr; 
        default :
        return state;
    }
}

// 액션함수 생성 & 내보내기
export const addGuest =(guest)=> ({type:"addGuest", payload:guest});


// 리듀서함수 내보내기 > modules/index.js에 추가
export default guest;