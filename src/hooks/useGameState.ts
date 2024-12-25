import {useState, useCallback, useEffect} from 'react'
import {difficultiesEnum} from "../consts/settings";

export const useGameState = () => {
    const [score, setScore] = useState(1)
    const [difficulty, setDifficulty] = useState("normal")
    const [gameOver, setGameOver] = useState(true)

    const incrementScore = useCallback((score : number) => {
        setScore(prevScore => prevScore + score)
    }, [])
    useEffect(()=>{
        console.log(difficulty)
    },[difficulty])

    const restartGame = () => {
        setScore(0)
        setGameOver(false)
    }

    return { score, setScore, difficulty, setDifficulty, gameOver, setGameOver, incrementScore, restartGame }
}

