import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import musicFile from "./music.mp3";

function MainPage() {
  const [seconds, setSeconds] = useState(0);
  const [isMilking, setIsMilking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sound, setSound] = useState(null);
  const [startTime, setStartTime] = useState();

  useEffect(() => {
    let id;
    if (isMilking && !isPaused) {
      id = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
      const newSound = new Howl({
        src: [musicFile],
        autoplay: true,
        loop: true,
        volume: 0.5,
      });
      setSound(newSound);
    } else {
      clearInterval(id);
      if (sound) {
        sound.stop();
      }
    }
    return () => {
      clearInterval(id);
      if (sound) {
        sound.stop();
      }
    };
  }, [isMilking, isPaused]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const remainingSeconds = time % 60;
    
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};


  const handleStart = () => {
    setStartTime(Date.now());
    setIsMilking(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsMilking(false);
    setIsPaused(false);
    setSeconds(0);
    if (sound) {
      sound.stop();
    }
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    const totalMilk = window.prompt("Enter total milk:");

    const milkingSession = {
      date: new Date().toLocaleDateString(),
      startTime: new Date(startTime).toLocaleTimeString(),
      endTime: new Date(endTime).toLocaleTimeString(),
      totalTime: formatTime(duration.toFixed(0)),
      totalMilk: totalMilk ? parseFloat(totalMilk) : 0,
    };
    const milkingSessions =
      JSON.parse(localStorage.getItem("milkingSessions")) || [];
    milkingSessions.push(milkingSession);
    localStorage.setItem("milkingSessions", JSON.stringify(milkingSessions));
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
    setIsMilking(true); 
  };

  return (
    <div className="mainpage">
      <div className="main-container">
        <h2>Milking Tracker with Music</h2>
        <div>
          <span className="timer">Timer: {formatTime(seconds)}</span>
        </div>
        <div className="button-div">
          {!isMilking && !isPaused && (
            <button onClick={handleStart}>Start</button>
          )}
          {isMilking && !isPaused && (
            <button onClick={handlePause}>Pause</button>
          )}
          {isMilking && isPaused && (
            <button onClick={handleResume}>Resume</button>
          )}
          {(isMilking || isPaused) && (
            <button onClick={handleStop}>Stop</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
