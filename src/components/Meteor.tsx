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

    useEffect(() => {
        const interval = setInterval(() => {
            setY(prevY => {
                if (prevY >= 280) {
                    clearInterval(interval)
                    meteoriteSetting[size].deadly ? onReachBottom() : onDestroy(id, 0)
                    return prevY
                }
                return prevY + meteoriteSetting[size].speed
            })
        }, 50)

        return () => clearInterval(interval)
    }, [onReachBottom])

    const handleClick = () => {
        setClicks(prevClicks => {

            const newClicks = prevClicks + 1
            if (newClicks >= meteoriteSetting[size].clicksRequired) {
                console.log("123")
                onDestroy(id, meteoriteSetting[size].score)
            }
            return newClicks
        })
    }

    return (
        <div
            className={`${styles.meteor} ${styles[size]}`}
            style={{ left: `${x}px`, top: `${y}px` }}
            onClick={handleClick}
        />
    )
}

