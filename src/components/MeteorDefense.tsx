'use client'

import React, { useState } from 'react'
import { GameBoard } from './GameBoard'
import { DifficultySelector } from './DifficultySelector'
import { Button } from './Button'
import { useGameState } from '../hooks/useGameState'
import styles from '../styles/MeteorDefense.module.css'

export default function MeteorDefense() {
    const [isGameStarted, setIsGameStarted] = useState(false)
    const {
        score,
        difficulty,
        setDifficulty,
        gameOver,
        setGameOver,
        incrementScore,
        restartGame
    } = useGameState()

    const startGame = () => {
        setIsGameStarted(true)
        restartGame()
    }

    const handleGameOver = () => {
        setGameOver(true)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Защита от метеоритов</h1>
            {!isGameStarted || gameOver ? (
                <div className={styles.gameOver}>
                    <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
                    <Button onClick={startGame}>
                        {gameOver ? 'Играть снова' : 'Начать игру'}
                    </Button>
                    {gameOver && (
                        <p className={styles.gameOverText}>Игра окончена! Ваш счет: {score}</p>
                    )}
                </div>
            ) : (
                <>
                    <div className={styles.score}>Счет: {score}</div>
                    <GameBoard
                        difficulty={difficulty}
                        gameOver={gameOver}
                        onGameOver={handleGameOver}
                        onMeteorDestroyed={incrementScore}
                    />
                </>
            )}
        </div>
    )
}

