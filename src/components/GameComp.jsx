// 방명록 페이지에 들어갈 미니게임 컴포넌트 (가위바위보)

import { useState, useRef, useEffect, useCallback } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import "../css/GameComp.css";

    const scores = {
        '✊': 1,
        '✋': 0,
        '✌': -1,
    };

    const GameComp = () => {
        const [computer, setComputer] = useState('✊');
        const [user, setUser] = useState('🙏');
        const [result, setResult] = useState('result');
        const [score, setScore] = useState(0);
        const [btnDisabled, setBtnDisabled] = useState(false);
        const interval = useRef(null);
        const changeHand = useCallback(() => {
            if (computer === '✊') {
            setComputer('✋');
            } else if (computer === '✋') {
            setComputer('✌');
            } else if (computer === '✌') {
            setComputer('✊');
            }
        }, [computer]);

        const onClickBtn = (user) => () => {
            setUser(user);
            setBtnDisabled(true);
            clearInterval(interval.current);
            const diff = scores[user] - scores[computer];
            if (diff === 0) {
            setResult('draw');
            } else if ([-1, 2].includes(diff)) {
            setResult('win');
            setScore((prevScore) => prevScore + 1);
            } else {
            setResult('lose');
            setScore((prevScore) => prevScore - 1);
            }
            setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
            setBtnDisabled(false);
            }, 1000);
        };

        useEffect(() => {
            interval.current = setInterval(changeHand, 100);
            return () => {
            clearInterval(interval.current);
            };
        }, [changeHand]);

    return ( 
        <div className='gameWrapper'>
            <br/><br/>
            <h3><Spinner animation="border" size='xl' variant="warning" />　
            Mini-game : Rock paper scissors</h3>
            <br /><br />
            <Container className='game-con'>
                <Row>
                    <Col><div><h1>{computer}</h1><b>computer</b></div></Col>
                    <Col><div><h2>{result}</h2><b style={{color:"red"}}>vs</b></div></Col>
                    <Col><div><h1>{user}</h1><b style={{color:'darkorange'}}>You</b></div></Col>
                </Row>
                <Row>
                    <Col><span style={{fontSize:"20px"}}><br/>Random</span></Col>
                    <Col><div></div></Col>
                    <Col className="mt-4">
                        <div className='RSPbtn-box'>
                        <button disabled={btnDisabled} className="btn-game" onClick={onClickBtn('✊')}>
                        Rock
                        </button>
                        <button disabled={btnDisabled} className="btn-game" onClick={onClickBtn('✋')}>
                        Paper
                        </button>
                        <button disabled={btnDisabled} className="btn-game" onClick={onClickBtn('✌')}>
                        Scissors
                        </button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    
                    
                    
                </Row>
                <Row style={{marginTop:'15px'}}> 
                    <Col><div></div></Col>
                    <Col><div></div></Col>
                    <Col>your Score : <b style={{color:"red"}}>{score}</b></Col>
                </Row>
            </Container>
        <br /><br /><br />
        </div>
    );
}

export default GameComp;