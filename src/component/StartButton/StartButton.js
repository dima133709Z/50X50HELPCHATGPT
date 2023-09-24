import React from 'react';
import style from '../../styles/StartButton.module.scss'

// Компонент StartButton принимает один пропс (props) - функцию onStartClick.
function StartButton(props) {
    return (
        <button onClick={props.onStartClick} className={style.start}>Cтарт</button>
    );
}

export default StartButton;
