import {meteoriteSetting} from "../consts/settings";

let meteorId = 0

export const generateMeteor = () => {
    const random = Math.random()
    const size = Math.random() > 1 - meteoriteSetting["large"].spawnRate ?  Math.random() > 1 - meteoriteSetting["bonus"].spawnRate ? 'bonus' : 'large' : 'small'
    const x = Math.random() * (400 - (size === 'small' ? 32 : 48))

    return {
        id: meteorId++,
        x,
        size,
    }
}

