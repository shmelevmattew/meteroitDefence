import { useState, useCallback } from 'react'

export const useGameState = () => {
    const [score, setScore] = useState(0)
    const [difficulty, setDifficulty] = useState('medium')
    const [gameOver, setGameOver] = useState(false)

    const incrementScore = useCallback(() => {
        setScore(prevScore => prevScore + 1)
    }, [])

    const restartGame = () => {
        setScore(0)
        setGameOver(false)
    }

    return { score, setScore, difficulty, setDifficulty, gameOver, setGameOver, incrementScore, restartGame }
}

