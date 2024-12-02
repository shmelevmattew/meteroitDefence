let meteorId = 0

export const generateMeteor = (difficulty: string) => {
    const size = Math.random() > 0.7 ? 'large' : 'small'
    const x = Math.random() * (400 - (size === 'small' ? 32 : 48))

    return {
        id: meteorId++,
        x,
        size,
    }
}

