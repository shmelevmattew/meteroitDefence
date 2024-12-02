'use client'

import { useEffect, useState } from 'react'
import { Meteor } from './Meteor'
import { generateMeteor } from '../utils/meteorUtils'
import styles from '../styles/GameBoard.module.css'

interface GameBoardProps {
    difficulty: string
    gameOver: boolean
    onGameOver: () => void
    onMeteorDestroyed: () => void
}

export const GameBoard: React.FC<GameBoardProps> = ({ difficulty, gameOver, onGameOver, onMeteorDestroyed }) => {
    const [meteors, setMeteors] = useState<any[]>([])

    useEffect(() => {
        if (gameOver) {
            setMeteors([])
            return
        }

        const interval = setInterval(() => {
            setMeteors(prevMeteors => [...prevMeteors, generateMeteor(difficulty)])
        }, difficulty === 'easy' ? 2000 : difficulty === 'medium' ? 1500 : 1000)

        return () => clearInterval(interval)
    }, [difficulty, gameOver])

    const handleMeteorDestroy = (id: number) => {
        setMeteors(prevMeteors => prevMeteors.filter(meteor => meteor.id !== id))
        onMeteorDestroyed()
    }

    const handleMeteorReachBottom = () => {
        onGameOver()
    }

    return (
        <div className={styles.gameBoard}>
            {meteors.map(meteor => (
                <Meteor
                    key={meteor.id}
                    {...meteor}
                    onDestroy={() => handleMeteorDestroy(meteor.id)}
                    onReachBottom={handleMeteorReachBottom}
                />
            ))}
        </div>
    )
}

