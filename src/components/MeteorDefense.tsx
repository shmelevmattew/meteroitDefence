'use client'

import React, {useEffect, useRef, useState} from 'react'
import { GameBoard } from './GameBoard'
import { DifficultySelector } from './DifficultySelector'
import { Button } from './Button'
import { useGameState } from '../hooks/useGameState'
import styles from '../styles/MeteorDefense.module.css'
import {difficultiesEnum} from "../consts/settings";
import HyperModal from "react-hyper-modal";
import {HelperModal} from "./HelperModal";
import ReactInputVerificationCode, {
    ReactInputVerificationCodeProps,
} from 'react-input-verification-code';
import {addScore, getByName, insertScore} from "../api/service/score";
import {log} from "util";
import {useLastEnteredName} from "../hooks/useLastEnteredName";

export default function MeteorDefense() {
    const [isGameStarted, setIsGameStarted] = useState(false)
    const [cutscene , setCutscene] = useState(false)
    const [displayModal,setDisplayModal] = useState(true)
    const [saveResults,setSaveResults] = useState(true)
    const [login,setLogin] = useState<any>("")
    const [shouldUpdate,setShouldUpdate] = useState(false)
    const vidRef = useRef<any>(null);
    const {
        score,
        difficulty,
        setDifficulty,
        gameOver,
        setGameOver,
        incrementScore,
        restartGame
    } = useGameState()
    const [
        lastEnteredName,
        setLastEnteredName
    ] = useState("")

    useEffect(()=>{
        console.log(login)
    },[login])

    const startGame = () => {
        setIsGameStarted(true)
        setDisplayModal(false)
        restartGame()
    }

    const handleGameOver = () => {
        setGameOver(true)
        setCutscene(true)
        setDisplayModal(true)
        setSaveResults(true)
        setTimeout(()=>{
            setCutscene(false)
        },6000)
    }

    function sendResults(){
        if(login.length === 4){
            getByName(login).then(res=>{
                if(res.length > 0) {
                    if (res[0].score < score){
                        insertScore(score,login).then(()=>{
                            setSaveResults(false)
                            setLogin("")
                        })
                    }else{
                        setSaveResults(false)
                        setLogin("")
                    }

                } else{
                    addScore(login,score).then((res)=>{
                        setSaveResults(false)
                        setLogin("")
                    })
                }
            })
            setLastEnteredName(login)
            setShouldUpdate(prev=>!prev)

        }
    }

    return (

        <div className={styles.container}>
            <HelperModal displayButtons={displayModal} lastEnteredName={lastEnteredName} shouldUpdate={shouldUpdate}/>
            {
                cutscene? (
                    <>
                        <div className={styles.cutscene}>
                            <video className={styles.centered} ref={vidRef} autoPlay={true} loop muted>
                                <source  src={require("../assets/cutscene.mp4")} type="video/mp4" />
                            </video>
                        </div>
                    </>
                ) : (
                    <>
                        {!isGameStarted || gameOver ? (
                            <div className={styles.gameOver}>
                                <DifficultySelector difficulty={difficulty as difficultiesEnum} setDifficulty={setDifficulty} />
                                <Button onClick={startGame}>
                                    {gameOver ? 'Играть снова' : 'Начать игру'}
                                </Button>

                                {gameOver && (
                                    <>
                                        <p className={styles.gameOverText}>Игра окончена! Ваш счет: {score}</p>
                                        {
                                            saveResults &&
                                            <>
                                                <p className={styles.saveResultsText}>Для сохранения результатов введите имя:</p>
                                                <div className={`${styles.loginInput} custom-styles`} >
                                                    <ReactInputVerificationCode
                                                        autoFocus
                                                        onCompleted={setLogin}
                                                        value={login}
                                                        length={4}
                                                        type="alphanumeric"
                                                        placeholder={"A"}
                                                    />
                                                    <Button className={styles.loginInputButton} onClick={sendResults}>
                                                        Отправить
                                                    </Button>
                                                </div>
                                                <p className={styles.error}>Заполните все 4 буквы (или цифры)!</p>
                                            </>
                                        }

                                    </>
                                )}
                            </div>

                        ) : (
                            <>
                                {/*<div className={styles.score}>Счет: {score}</div>*/}
                                <GameBoard
                                    difficulty={difficulty as any}
                                    gameOver={gameOver}
                                    onGameOver={handleGameOver}
                                    onMeteorDestroyed={incrementScore}
                                    score={score}
                                />

                            </>
                        )}
                    </>
                )
            }

        </div>
    )
}

