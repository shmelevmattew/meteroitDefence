import { useState, useCallback } from 'react'

export const useGameState = () => {
    const [score, setScore] = useState(0)
    const [difficulty, setDifficulty] = useState('medium')
    const [gameOver, setGameOver] = useState(false)

    const incrementScore = useCallback((score : number) => {
        setScore(prevScore => prevScore + score)
    }, [])

    const restartGame = () => {
        setScore(0)
        setGameOver(false)
    }

    return { score, setScore, difficulty, setDifficulty, gameOver, setGameOver, incrementScore, restartGame }
}

