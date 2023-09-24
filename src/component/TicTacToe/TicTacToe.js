import React, { useState, useEffect } from 'react';
import WinnerResults from '../WinnerResults/WinnerResults';
import GameBoard from '../GameBoard/GameBoard';
import StartButton from '../StartButton/StartButton';
import style from '../../styles/TicTacToe.module.scss';

// Размер игровой доски
const boardSize = 50;

// Количество подряд идущих символов для победы
const consecutiveToWin = 5;

// Функция для вычисления победителя игры
function calculateWinner(squares) {
    const lines = [];

    // Горизонтальные линии
    for (let i = 0; i < boardSize * boardSize; i += boardSize) {
        for (let j = 0; j <= boardSize - consecutiveToWin; j++) {
            const row = [];
            for (let k = 0; k < consecutiveToWin; k++) {
                row.push(i + j + k);
            }
            lines.push(row);
        }
    }

    // Вертикальные линии
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j <= boardSize - consecutiveToWin; j++) {
            const col = [];
            for (let k = 0; k < consecutiveToWin; k++) {
                col.push(i + (j + k) * boardSize);
            }
            lines.push(col);
        }
    }

    // Диагонали
    for (let i = 0; i <= boardSize - consecutiveToWin; i++) {
        for (let j = 0; j <= boardSize - consecutiveToWin; j++) {
            const diagonal1 = [];
            const diagonal2 = [];
            for (let k = 0; k < consecutiveToWin; k++) {
                diagonal1.push((i + k) + (j + k) * boardSize);
                diagonal2.push((i + k) + (boardSize - 1 - j - k) * boardSize);
            }
            lines.push(diagonal1, diagonal2);
        }
    }

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (let j = 0; j <= line.length - consecutiveToWin; j++) {
            const consecutiveSymbols = line.slice(j, j + consecutiveToWin).map((index) => squares[index]);
            if (consecutiveSymbols.every((symbol) => symbol === 'X')) {
                return 'X';
            } else if (consecutiveSymbols.every((symbol) => symbol === 'O')) {
                return 'O';
            }
        }
    }

    return null;
}

function TicTacToe() {
    // Состояния игры
    const [isLoading, setIsLoading] = useState(true);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [board, setBoard] = useState(Array(boardSize * boardSize).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [movesCount, setMovesCount] = useState(0);
    const [showWinnerPopup, setShowWinnerPopup] = useState(false);

    //Имитация задержки
    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        };

        fetchData();
    }, []);

    // Функция для начала новой игры
    const restartGame = () => {
        setIsGameStarted(true);
        setBoard(Array(boardSize * boardSize).fill(null));
        setXIsNext(true);
        setWinner(null);
        setMovesCount(0);
        setShowWinnerPopup(false);
    };

    // Обработчик клика по клетке игровой доски
    const handleClick = (i) => {
        if (winner || board[i]) {
            return;
        }

        const newBoard = [...board];
        newBoard[i] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
        setMovesCount(movesCount + 1);

        const calculatedWinner = calculateWinner(newBoard);
        if (calculatedWinner) {
            setWinner(calculatedWinner);
            setShowWinnerPopup(true);
        } else if (movesCount + 1 === boardSize * boardSize) {
            setWinner('Draw');
            setShowWinnerPopup(true);
        }
    };

    // клетка игровой доски
    const renderSquare = (i) => (
        <button className={style.square} onClick={() => handleClick(i)}>
            {board[i]}
        </button>
    );

    // загрузка, начала игры
    const renderGameContent = () => {
        if (isLoading) {
            return (
                <div className={style.preloaderContainer}>
                    <div className={style.preloader}></div>
                </div>
            );
        } else if (isGameStarted) {
            return (
                <>
                    <GameBoard renderSquare={renderSquare} />
                    {showWinnerPopup && <WinnerResults winner={winner} startGame={restartGame} />}
                </>
            );
        } else {
            return <StartButton onStartClick={restartGame} />;
        }
    };

    return (
        <div className={style.centerContainer}>
            <div className={style.gameBoard}>
                {renderGameContent()}
            </div>
        </div>
    );
}

export default TicTacToe;
