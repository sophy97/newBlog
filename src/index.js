import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter} from 'react-router-dom';

// 웹을 사용할때 파이어베이스를 들고오기 위해 import
// import {} from, import from을 통해서 가져오는 경우
// : export, export default로 되어있는 값을 가져와서,
//   현재 js 파일에서만 사용 (다른 곳에서 사용하려면 다시 import)

// js, css를 들고 올때 import해서만 들고오는 경우
// : 전체 파일에 그 내용이 실행 적용 (어디에서 한곳에 들고와도 ok)
import './database/firebase';

// 리덕스 사용을 위해 리액트-리덕스에서 프로바이더 추가
import { Provider } from 'react-redux';
// 리덕스에서 createStore를 추가
import {createStore} from "redux";
import rootReducer from './modules';

// createStore를 통해서 store 생성 : ()안에 값을 연결 <--modules의 index의 rootReducer
const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* provider는 어떻게든 App만 감싸는 형태면 됨 */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();