import React, { useState, useEffect, useRef } from 'react'
import { parseTime } from '../helpers'

export default function Timer({ time, running }) {
  const [timeLeft, setTimeLeft] = useState(time);
  const [jump, setJump] = useState(100)
  const lastTickRef = useRef()
  const intervalRef = useRef();
  useEffect(() => {
    setTimeLeft(time);
  }, [time]);
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if(!running) return
    intervalRef.current = setInterval(() => {
      let amt = lastTickRef.current == null ? 0 : Date.now() - lastTickRef.current
      lastTickRef.current = Date.now()
      setTimeLeft(prev => prev - amt);
    }, jump);
  }, [running]);
  return (
    <span 
      className='time-left'
      style={{ color: timeLeft < 1000 * 30 ? 'red' : 'black' }}>
      { parseTime(Math.max(timeLeft, 0), timeLeft < 1000 * 10) }
    </span>
  )
}