import React, { useState, useEffect, useRef } from "react";
import "./Timer.css";

export default function Timer({ time, isPaused }) {
  const [displayTime, setDisplayTime] = useState(formatTime(time));
  const prevTimeRef = useRef(time);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    if (isPaused) {
      isPausedRef.current = true;
    } else {
      isPausedRef.current = false;
      prevTimeRef.current = time;
      setDisplayTime(formatTime(time));
    }
  }, [time, isPaused]);

  useEffect(() => {
    let interval = null;

    if (!isPausedRef.current) {
      interval = setInterval(() => {
        const currentTimestamp = Date.now();
        const deltaTime = currentTimestamp - prevTimeRef.current;
        const newTime = prevTimeRef.current + deltaTime;
        prevTimeRef.current = currentTimestamp;
        setDisplayTime(formatTime(newTime));
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