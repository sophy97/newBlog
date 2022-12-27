// Navbar, footer가 항상 출력되도록
import HomeLink from './HomeLink';
import Footer from './Footer';
//import { Outlet } from 'react-router-dom';
const Layout = () => {

    return ( 
        <div>
            <HomeLink />
            {/* 아울렛 자리에 하위 컴포넌트들 렌더링함 */}
            {/* <Outlet /> */}
            <Footer />
        </div>
    );
}
export default Layout;