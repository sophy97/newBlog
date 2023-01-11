import { useState } from "react";
import { FloatingLabel, Form, Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addGuest } from "../modules/guest";
import GameComp from './../components/GameComp';
import "../css/Guest.css";

const Guest = () => {
    // +리덕스로 guest의 값 가져와서 map으로 출력
    const guestList = useSelector((state)=>(state.guest));
    const dispatch = useDispatch();

    // +로그인한 유저의 이메일 정보 들고오기위해 리덕스에서 currentUser 들고오기
    const currentUser = useSelector((state)=>(state.currentUser));

    const [name, setName] = useState(currentUser ? currentUser.email:"익명");
    const [text, setText] = useState("방명록을 남겨보세요");
    
    return ( 
        <div>
            <GameComp />
            <div className="guest_printWrapper">
                <h3 className="guest-title">방명록</h3>
                <Card style={{ width:"100%" }}>
                    <ListGroup variant="flush">
                        {
                            guestList.map((guest)=> (
                            <PrintGuest key={guest.guestId} guest={guest} />
                            ))
                        }
                    </ListGroup>
                </Card>
            </div>
            <br/>
            <div className="guest_inputWrapper">
                <h5 className="guest-title">방명록 작성하기</h5>
                {
                    currentUser ? (
                        <>
                        <b>{currentUser.email}</b> 님, <br/>
                        <br />
                        <FloatingLabel controlId="floatingTextarea2" label="방명록 내용 작성">
                            <Form.Control
                            as="textarea" onChange={(e)=>{setText(e.target.value)}}
                            style={{ height: '100px' }} />
                        </FloatingLabel>
                        </>
                        ):(
                        <>
                        <input type="text" value={name} 
                            style={{border:"none"}}
                            onChange={(e)=>{setName(e.target.value)}} />
                        <br /><br />
                        <FloatingLabel controlId="floatingTextarea2" label="방명록 내용 작성">
                            <Form.Control
                            as="textarea" onChange={(e)=>{setText(e.target.value)}}
                            style={{ height: '100px' }} />
                        </FloatingLabel>
                        </>
                        )
                }
                <br />
                <button className="Btn"
                onClick={()=>{dispatch(addGuest({name:name, text:text}))}}>
                작성
                </button>
            </div>
        </div>
    );
}

export default Guest;


// +추가
// 방명록 내용을 하나씩 출력할 공간을 컴포넌트로 따로 작성
// react-bootstrap 의 ListGroup.Item에 출력하고자 함
const PrintGuest =({guest})=> {
    return (
        <ListGroup.Item>
            <b>{guest.name} | </b> {guest.text}
        </ListGroup.Item>
    )
}