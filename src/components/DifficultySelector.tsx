import { Button } from './Button'
import styles from '../styles/DifficultySelector.module.css'
import {FC} from "react";
import {difficultiesEnum} from "../consts/settings";

interface DifficultySelectorProps {
    difficulty: any
    setDifficulty: (difficulty: "easy" | "normal" | "hard") => void
}

export const DifficultySelector: FC<DifficultySelectorProps> = ({ difficulty, setDifficulty }) => {
    return (
        <div className={styles.container}>
            {
                (Object.keys(difficultiesEnum) as Array<keyof typeof difficultiesEnum>).map((difficultyKey,index)=>{
                    return <Button
                        onClick={() => setDifficulty(difficultyKey)}
                        variant={difficulty == difficultyKey ? 'primary' : 'outline' }
                        key={index}
                    >
                        {
                            difficultiesEnum[difficultyKey]
                        }
                    </Button>
                })
            }
        </div>
    )
}

