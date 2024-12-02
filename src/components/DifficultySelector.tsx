import { Button } from './Button'
import styles from '../styles/DifficultySelector.module.css'

interface DifficultySelectorProps {
    difficulty: string
    setDifficulty: (difficulty: string) => void
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ difficulty, setDifficulty }) => {
    return (
        <div className={styles.container}>
            <Button
                onClick={() => setDifficulty('easy')}
                variant={difficulty === 'easy' ? 'primary' : 'outline'}
            >
                Легко
            </Button>
            <Button
                onClick={() => setDifficulty('medium')}
                variant={difficulty === 'medium' ? 'primary' : 'outline'}
            >
                Средне
            </Button>
            <Button
                onClick={() => setDifficulty('hard')}
                variant={difficulty === 'hard' ? 'primary' : 'outline'}
            >
                Сложно
            </Button>
        </div>
    )
}

