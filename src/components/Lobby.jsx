import React, { useState, useEffect } from 'react'
import { useSocket } from '../contexts/SocketContext'

export default function Lobby() {
  const socket = useSocket()
  const [games, setGames] = useState([])
  
  useEffect(() => {
    if(!socket) return
    socket.on('lobby', setGames)
    return () => socket.off('lobby')
  }, [socket])
  return (
    <div className='lobby-container'>
      { 
        games.map(game => {
          return (
            <div className='lobby-item' key={game.id}>
              { game.players[0].username }
            </div>
          )  
        })
      }
    </div>
  )
}