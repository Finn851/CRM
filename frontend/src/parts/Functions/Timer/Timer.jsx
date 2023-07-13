import React, { useState, useEffect, useRef } from "react";
import "./Timer.css";

export default function Timer({ time }) {
  const [displayTime, setDisplayTime] = useState(formatTime(time));
  const prevTimeRef = useRef(time);



  useEffect(() => {
    if (time !== prevTimeRef.current) {
      setDisplayTime(formatTime(time));
      prevTimeRef.current = time;
    }
  }, [time]);

  useEffect(() => {
    let interval = null;

    if (time > 0 && time !== prevTimeRef.current) {
      interval = setInterval(() => {
        setDisplayTime((prevDisplayTime) => {
          const newTime = prevTimeRef.current + 1000;
          prevTimeRef.current = newTime;
          return formatTime(newTime);
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(
      2,
      "0"
    )}`;
  }

  return <div className="timer">{displayTime}</div>;
}
