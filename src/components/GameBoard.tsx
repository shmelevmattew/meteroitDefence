'use client'

import {useEffect, useRef, useState} from 'react'
import { Meteor } from './Meteor'
import { generateMeteor } from '../utils/meteorUtils'
import styles from '../styles/GameBoard.module.css'

import Confetti from 'react-confetti'
import {difficultiesEnum, generalSettings, settings} from "../consts/settings";

interface GameBoardProps {
    difficulty: keyof typeof difficultiesEnum
    gameOver: boolean
    onGameOver: () => void
    onMeteorDestroyed: ( score : number ) => void
    score : number
}

export const GameBoard: React.FC<GameBoardProps> = ({ difficulty, gameOver, onGameOver, onMeteorDestroyed , score }) => {
    const [meteors, setMeteors] = useState<any[]>([])
    const [conffeti,setConffeti] = useState<any>(false)
    const [previousCelebrationScore , setPreviousCelebrationScore] = useState<number>(0)
    //width: 532px;
    //     height: 379px;
    useEffect(() => {
        if (gameOver) {
            setMeteors([])
            return
        }
        const interval = setInterval(() => {
            setMeteors(prevMeteors => [...prevMeteors, generateMeteor()])
        }, settings[difficultiesEnum[difficulty]].meteorInterval)

        return () => clearInterval(interval)
    }, [difficulty, gameOver])

    const handleMeteorDestroy = (id: number, score : number) => {
        setMeteors(prevMeteors => prevMeteors.filter(meteor => meteor.id !== id))
        onMeteorDestroyed(score)
    }

    const handleMeteorReachBottom = () => {
        onGameOver()
    }

    useEffect(()=>{
        const dividedScore = Math.floor(score / generalSettings.celebrationPerScore)
        console.log(dividedScore)

        if(dividedScore > previousCelebrationScore && dividedScore !== 0 ){
            setPreviousCelebrationScore(dividedScore)
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
                    onDestroy={handleMeteorDestroy}
                    onReachBottom={handleMeteorReachBottom}
                />
            ))}
            {
                conffeti && <Confetti width={532} height={379} recycle={false} />
            }
            <div className={styles.score}>{score}</div>
        </div>
    )
}

