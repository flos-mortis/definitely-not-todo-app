import React, { useEffect, useRef } from "react";

interface TimerProps {
    isActive?: boolean
}

const Timer = ({isActive}: TimerProps) => {
    const[timer, setTimer] = React.useState(0)

    const increment = useRef<any>(null)

    const handleStartTimer = () => {
        increment.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }

    const handleStopTimer = () => {
        clearInterval(increment.current)
    }

    useEffect(() => {
        if (isActive) {
            handleStartTimer()
        } else {
            handleStopTimer()
        }
        return () => handleStopTimer()
    }, [isActive])

    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${Number(minutes) % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
    
        return `${getHours}:${getMinutes}:${getSeconds}`
      }

    return (
        <div>
            <p>Time in work:</p>
            <p>{formatTime()}</p>
        </div>
    )
}

export default Timer