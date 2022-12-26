// 작성한 리덕스 모듈들을 하나로 묶어서 사용 후,
// 내보내기 (combineReducers)
import { combineReducers } from "redux";

// 작성한 리덕스 모듈 연결하기
import currentUser from "./currentUser";
import guest from "./guest";
import posts from "./posts";
import comments from "./comments";

const rootReducer = combineReducers({ 
    currentUser, guest, posts, comments
});

export default rootReducer;