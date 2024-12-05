export enum difficultiesEnum {
    'easy' = "Легкая",
    'normal' = "Средняя",
    'hard' = "Сложная"
}

interface difficultySettings {
    meteorInterval : number
}

export const settings : Record<difficultiesEnum, difficultySettings> = {
    [difficultiesEnum.easy]: {
        meteorInterval : 2222000
    },
    [difficultiesEnum.normal]: {
        meteorInterval : 1500
    },
    [difficultiesEnum.hard] : {
        meteorInterval : 700
    }
}

export const generalSettings = {
    celebrationPerScore : 10
}

type MeteoriteVariants = "bonus" | "large" | "small"

interface  Meteorite {
    deadly : boolean,
    speed : number,
    clicksRequired : number,
    score: number,
    spawnRate : number
}

export const meteoriteSetting : Record<MeteoriteVariants, Meteorite> = {
    small : {
        speed : 7,
        deadly : true,
        clicksRequired : 1,
        score: 1,
        spawnRate : 1
    },
    large: {
        speed : 5,
        deadly : true,
        clicksRequired : 2,
        score: 2,
        spawnRate : 0.3

    },
    bonus: {
        speed : 20,
        deadly : false,
        clicksRequired : 3,
        score: 10,
        spawnRate : 0.1
    }
}
