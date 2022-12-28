import { Outlet } from 'react-router-dom';
import PageLink from './PageLink';
const Layout = () => {

    return ( 
        <div>
            {/* <HomeLink /> */}
            <PageLink />
            {/* 아울렛 자리에 하위 컴포넌트들이 렌더링됨 
                일괄 스타일 주기 위해, 아울렛을 감싼 div에 속성 적용*/}
            <div className="mx-5 mt-5" >
                <Outlet />
            </div>
            
            
        </div>
    );
}
export default Layout;