import { Route, Routes } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Page/Home';
import LoginForm from './Page/LoginForm';

// Routes와 Route를 이용해 화면 관리
function App() {
  return (
    <div className="App">
      {/** 고정할 화면이 있다면 Routes바깥에 두거나,
       *   Layout을 사용해 outlet으로 중첩하여 위치를 잡는다 */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loginform' element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
