import React, { useState, useEffect, useRef } from 'react'

type Props = {}

function Stopwatch({ }: Props) {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef<number | null>(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            if (intervalIdRef.current !== null) {
                clearInterval(intervalIdRef.current);  // Upewnij się, że current nie jest null
            }
        }
    }, [isRunning]);

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        let paddedHours = String(hours).padStart(2, '0');
        let paddedMinutes = String(minutes).padStart(2, '0');
        let paddedSeconds = String(seconds).padStart(2, '0');
        let paddedMilliseconds = String(milliseconds).padStart(2, '0');

        return `${paddedHours}:${paddedMinutes}:${paddedSeconds}:${paddedMilliseconds}`
    }

    return (
        <div className='stopwatch'>
            <div className='display'>
                {formatTime()}
            </div>
            <div className='controls'>
                <button className='startButton' onClick={start}>Start</button>
                <button className='stopButton' onClick={stop}>Stop</button>
                <button className='resetButton' onClick={reset}>Reset</button>
            </div>
        </div>
    )
}

export default Stopwatch