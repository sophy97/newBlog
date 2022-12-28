import { useState } from "react";
import { FloatingLabel, Form, Button, Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addGuest } from "../modules/guest";


const Guest = () => {
    // +리덕스로 guest의 값 가져와서 map으로 출력
    const guestList = useSelector((state)=>(state.guest));
    const dispatch = useDispatch();

    // +이메일 정보를 들고오기위해 리덕스에서 currentUser 들고오기
    const currentUser = useSelector((state)=>(state.currentUser));


    const [name, setName] = useState(currentUser ? currentUser.email:"익명");
    const [text, setText] = useState("방명록을 남겨보세요");
    
    return ( 
        <div>
            {
                currentUser ? (
                    <>
                    <p>{currentUser.email}</p>
                    <FloatingLabel controlId="floatingTextarea2" label="작성할 내용">
                        <Form.Control
                        as="textarea" onChange={(e)=>{setText(e.target.value)}}
                        style={{ height: '100px' }} />
                    </FloatingLabel>
                    </>
                    ):(
                    <>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="이름"
                        className="mb-3">
                        <Form.Control type="text" value={name} 
                        style={{border:"none", borderBottom:"1px solid lightgray"}}
                        onChange={(e)=>{setName(e.target.value)}} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingTextarea2" label="작성할 내용">
                        <Form.Control
                        as="textarea" onChange={(e)=>{setText(e.target.value)}}
                        style={{ height: '100px' }} />
                    </FloatingLabel>
                    </>
                    )
            }
            
            <br />
            {/* onClick이벤트에 리듀서함수(guest.js) 추가 예정 */}
            {/* <button onClick={()=>{dispatch(addGuest({name:name, text:text}))}}>작성</button> */}
            <Button variant="outline-primary"
            onClick={()=>{dispatch(addGuest({name:name, text:text}))}}
            >작성</Button>
            <hr />
            <h4>방명록</h4> 
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
    );
}

export default Guest;


// +추가
// 방명록 내용을 하나씩 출력할 공간을 컴포넌트로 따로 작성
// react-bootstrap 의 ListGroup.Item에 출력하고자 함
const PrintGuest =({guest})=> {
    return (
        <ListGroup.Item>
            <b>{guest.name}</b>
            <br />
            {guest.text}
        </ListGroup.Item>
    )
}