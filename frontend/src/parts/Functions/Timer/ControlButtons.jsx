import React from "react";
import "./ControlButtons.css";
 
export default function ControlButtons(props) {
    const StartButton = (
        <div className="btn btn-one btn-start"
            onClick={props.handleStart}>
            Начать работу
        </div>
    );
    const ActiveButtons = (
        <div className="btn-grp">
            <div className="btn btn-two"
                onClick={props.handleReset}>
                Перезапустить
            </div>
            <div className="btn btn-one"
                onClick={props.handlePauseResume}>
                {props.isPaused ? "Продолжить" : "Пауза"}
            </div>
        </div>
    );
 
    return (
        <div className="Control-Buttons">
            <div>{props.active ? ActiveButtons : StartButton}</div>
        </div>
    );
}