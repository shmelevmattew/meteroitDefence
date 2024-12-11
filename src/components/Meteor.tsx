'use client'

import {useState, useEffect, FC} from 'react'
import styles from '../styles/Meteor.module.css'
import {meteoriteSetting} from "../consts/settings";

interface MeteorProps {
    id: number
    x: number
    size: 'small' | 'large' | 'bonus'
    onDestroy: (id: number, score : number ) => void
    onReachBottom: ( ) => void
}


export const Meteor: FC<MeteorProps> = ({ id, x, size, onDestroy, onReachBottom }) => {
    const [clicks, setClicks] = useState(0)

    const [y, setY] = useState(-50)
    const [enoughClicks, setEnoughClicks] = useState<boolean>(false)
    const iterator = clicksIterator(clicks)

    function* clicksIterator(limit : number) {
        for (let i = 0; i <= limit; i++) {
            if (i === 1) {
                yield { position: "strait", offsetY: -20 ,offsetX:0};
            }
            if (i === 2) {
                yield { position: "angled", offsetY: -20,offsetX:15};
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setY(prevY => {
                if (prevY >= 280) {
                    clearInterval(interval)
                    console.log()
                    if (meteoriteSetting[size].bonus){
                        onDestroy(id, 0)
                    }
                    else if (enoughClicks){
                        onDestroy(id, meteoriteSetting[size].score)
                    }
                    else{
                        onReachBottom()
                    }

                    return prevY
                }
                return prevY + (enoughClicks? meteoriteSetting[size].parachuteSpeed : meteoriteSetting[size].speed)
            })
        }, 20)

        return () => clearInterval(interval)
    }, [onReachBottom])

    const handleClick = () => {
       if(!enoughClicks){
           setClicks(prevClicks => {
               const newClicks = prevClicks + 1
               if (newClicks >= meteoriteSetting[size].clicksRequired) {
                   setEnoughClicks(prev=>{
                       return true
                   })
               }
               return newClicks
           })
       }
    }

    return (
        <>
            {
                [...iterator].map((obj,i,row)=>{
                    return (
                        <img src={require("../assets/parachute.png")}
                             style={{ left: `${x + obj.offsetX }px`, top: `${y + obj.offsetY}px` }}
                             className={styles.parachute}
                             key={i}
                        />
                    )
                })
            }
            <div
                className={`${styles.meteor} ${styles[size]}`}
                style={{ left: `${x}px`, top: `${y}px` }}
                onClick={handleClick}
            />
        </>
    )
}

