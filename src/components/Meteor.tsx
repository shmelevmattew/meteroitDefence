'use client'

import { useState, useEffect } from 'react'
import styles from '../styles/Meteor.module.css'

interface MeteorProps {
    id: number
    x: number
    size: 'small' | 'large'
    onDestroy: () => void
    onReachBottom: () => void
}

export const Meteor: React.FC<MeteorProps> = ({ id, x, size, onDestroy, onReachBottom }) => {
    const [clicks, setClicks] = useState(0)
    const [y, setY] = useState(-50)

    useEffect(() => {
        const interval = setInterval(() => {
            setY(prevY => {
                if (prevY >= 400) {
                    clearInterval(interval)
                    onReachBottom()
                    return prevY
                }
                return prevY + 5
            })
        }, 50)

        return () => clearInterval(interval)
    }, [onReachBottom])

    const handleClick = () => {
        setClicks(prevClicks => {
            const newClicks = prevClicks + 1
            if ((size === 'small' && newClicks === 1) || (size === 'large' && newClicks === 2)) {
                onDestroy()
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

