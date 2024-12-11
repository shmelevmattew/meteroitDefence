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
    bonus : boolean,
    parachuteSpeed: number,
}

export const meteoriteSetting : Record<MeteoriteVariants, Meteorite> = {
    small : {
        speed : 4,
        deadly : true,
        clicksRequired : 1,
        score: 1,
        spawnRate : 1,
        parachuteSpeed : 1,
        bonus : false,
    },
    large: {
        speed : 3,
        deadly : true,
        clicksRequired : 2,
        score: 2,
        spawnRate : 0.3,
        parachuteSpeed : 1,
        bonus : false,

    },
    bonus: {
        speed : 10,
        deadly : false,
        clicksRequired : 2,
        score: 10,
        spawnRate : 0.1,
        parachuteSpeed : 1,
        bonus : true,
    }
}
