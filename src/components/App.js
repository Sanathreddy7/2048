import './App.css';
import Header from './Header';
import { useState, useEffect } from 'react'
import Board from './Board';
import {
    getEmptyRandomPosition,
    getEmptyBoard,
    moveLeft,
    moveRight,
    moveUp,
    moveDown,
    isGameOver,
    checkWin
} from './Game'
import Modal from "./Modal.js"
import Score from "./Score.js"
import {FaArrowDown,FaArrowLeft,FaArrowRight,FaArrowUp} from "react-icons/fa"

function App() {
    let [board, updateBoard] = useState(getEmptyRandomPosition(getEmptyBoard()));
    let [gameOver,setGameOver]=useState(false);
    let [won,setWon]=useState(false);
    let [score,setScore]=useState(0);

    const startNewgame=()=>{
        setScore(0);
        updateBoard(getEmptyRandomPosition(getEmptyBoard()));
    }

    const checkEndGame = () => {
        if (isGameOver(board)) {
            startNewgame();
            setGameOver(true);
        }
        if (checkWin(board)) {
            startNewgame();
            setWon(true);
        }
    };

    let handleKeyPress = function(e) {
        let newBoard;
        console.log("hello");
        if (e.code === "ArrowUp")
            newBoard = moveUp(board);
        else if (e.code === "ArrowDown")
            newBoard = moveDown(board);
        else if (e.code === "ArrowRight")
            newBoard = moveRight(board);
        else if (e.code === "ArrowLeft")
            newBoard = moveLeft(board);

        if (e.code === "ArrowUp" || e.code === "ArrowDown" || e.code === "ArrowLeft" || e.code === "ArrowRight") {
            const updated = getEmptyRandomPosition(newBoard);
            updateBoard(updated);
            checkEndGame();
            setScore(score+1);
        }
        e.preventDefault();
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => { window.removeEventListener("keydown", handleKeyPress) };
    })

    return (
      <div className = "App" >
        <Header title = { 2048 }/>
        <div className='boardwrapper'>
            <Board board = { board }/>
            <Score score={score}/>
        </div>
        <button onClick={startNewgame} className="newgame">New Game</button>
        
        {gameOver && <Modal title={"OOPS! you lost try again!"} textcolor={"red"} closeModal={setGameOver} setScore={setScore}/>}
        {won && <Modal title={"Hurray you won!!"} textcolor={"green"}  closeModal={setWon} setScore={setScore}/>}

        <div className='how2playWrapper'>
            <h2 className='h2pHeader'>How to play?</h2>
            <p>Use your arrow keys to move the tiles. When two tiles with the same number touch, they merge into one! </p>
        </div>

        <div className='arrowkeys'>
            <div className='left'><FaArrowLeft className='arrow'/></div>
            <div className='right'><FaArrowRight className='arrow'/></div>
            <div className='up'><FaArrowUp className='arrow'/></div>
            <div className='down'> <FaArrowDown className='arrow'/></div>
        </div>
      </div>
    );
}
export default App;