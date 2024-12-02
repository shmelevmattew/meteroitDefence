import styles from '../styles/Button.module.css'

interface ButtonProps {
    children: React.ReactNode
    onClick: () => void
    variant?: 'primary' | 'outline'
    className?: string
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  onClick,
                                                  variant = 'primary',
                                                  className = ''
                                              }) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

