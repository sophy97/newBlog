import { Route, Routes } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// firestore test
import {db} from "./firebase";
import {collection} from "firebase/firestore";

import Home from './Page/Home';
import LoginForm from './Page/LoginForm';
import Guest from './Page/Guest';
import Posts from './Page/Posts';
import PostPage from './Page/PostPage';
import PostWriteForm from './Page/PostWriteForm';
import PostAddForm from './Page/PostAddForm';
import About from './Page/About';
import Mypage from './Page/Mypage';
import Layout from './components/Layout';

// Routes와 Route를 이용해 화면 관리
function App() {

  // firestore test > 9버전으로 작성할 것!
  // 컬렉션 자체를 참조
  const postRef = collection(db, "posts");
  console.log(postRef);


  return (
    <div className="App">
      {/** 고정할 화면이 있다면 Routes바깥에 두거나,
       *   Layout을 사용해 outlet으로 중첩하여 위치를 잡는다 */}
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/' element={<Layout />}>
            <Route path='/about' element={<About />} />
            <Route path='/loginform' element={<LoginForm />} />
            <Route path='/guest' element={<Guest />} />
            <Route path='/mypage' element={<Mypage />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/posts/:id' element={<PostPage />} />
            <Route path='/posts/modifyform' element={<PostWriteForm />} />
            <Route path='/posts/addform' element={<PostAddForm />} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;
