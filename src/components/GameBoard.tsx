'use client'

import {useEffect, useRef, useState} from 'react'
import { Meteor } from './Meteor'
import { generateMeteor } from '../utils/meteorUtils'
import styles from '../styles/GameBoard.module.css'
import {difficultySettings, generalSettings} from "../consts/difficultySettings";
import Confetti from 'react-confetti'

interface GameBoardProps {
    difficulty: string
    gameOver: boolean
    onGameOver: () => void
    onMeteorDestroyed: () => void
    score : number
}

export const GameBoard: React.FC<GameBoardProps> = ({ difficulty, gameOver, onGameOver, onMeteorDestroyed , score }) => {
    const [meteors, setMeteors] = useState<any[]>([])
    const [conffeti,setConffeti] = useState<any>(false)
    //width: 532px;
    //     height: 379px;
    useEffect(() => {
        if (gameOver) {
            setMeteors([])
            return
        }

        const interval = setInterval(() => {
            setMeteors(prevMeteors => [...prevMeteors, generateMeteor(difficulty)])
        }, difficulty === 'easy' ? difficultySettings.easy.meteorInterval : difficulty === 'medium' ? difficultySettings.normal.meteorInterval : difficultySettings.hard.meteorInterval)

        return () => clearInterval(interval)
    }, [difficulty, gameOver])

    const handleMeteorDestroy = (id: number) => {
        setMeteors(prevMeteors => prevMeteors.filter(meteor => meteor.id !== id))
        onMeteorDestroyed()
    }

    const handleMeteorReachBottom = () => {
        onGameOver()
    }

    useEffect(()=>{
        if(score % generalSettings.celebrationPerScore === 0 && score !== 0 ){
            setConffeti(true)
            const timeout = setTimeout(()=>{
                setConffeti(false)
            },10000)
        }
    },[score])

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
            {
                conffeti && <Confetti width={532} height={379} recycle={false} />
            }
        </div>
    )
}

