import React from 'react';
import style from '../../styles/GameBoard.module.scss';

// Компонент GameBoard отображает игровое поле, состоящее из квадратных ячеек.
function GameBoard(props) {
    const boardSize = 50; // Размер игровой доски (50x50)

    const rows = [];

    // Создаем строки игровой доски.
    for (let i = 0; i < boardSize; i++) {
        const row = [];
        // Создаем ячейки внутри строки с использованием renderSquare.
        for (let j = 0; j < boardSize; j++) {
            row.push(props.renderSquare(i * boardSize + j));
        }
        // Добавляем строку в массив rows.
        rows.push(
            <div key={i} className={style.boardRow}>
                {row}
            </div>
        );
    }

    // Отображаем игровую доску с созданными строками и ячейками.
    return <div>{rows}</div>;
}

export default GameBoard;
