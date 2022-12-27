import { useSelector } from "react-redux";


const Mypage = () => {

    // auth로그인된 유저 정보 가져오기
    const user = useSelector((state)=>(state.currentUser));
    // userInfoList 모듈 -배열 중 하나의 값만 들고오기 (.find(조건))
    const userInfo = useSelector((state)=>(state.userInfoList)
                    .find((info)=>(info.userEmail == user.email)))

    return ( 
        <div>
            <h3>유저 페이지</h3>
            <p>유저 이메일: {userInfo.userEmail}</p>
            <h6>좋아요리스트</h6>
            <ul>
                {/* userInfo안의 like[]를 map으로 출력한다 */}
                {
                    userInfo.like.map((like)=>{
                        <li key={like.postId}>
                            {like.title}
                        </li>
                    })
                }
            </ul>
        </div>
    );
}

export default Mypage;