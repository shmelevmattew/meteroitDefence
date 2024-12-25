import {useState, useCallback, useEffect} from 'react'
import {difficultiesEnum} from "../consts/settings";

export const useLastEnteredName = () => {
    const [lastEnteredName, setLastEnteredName] = useState('')

    return { lastEnteredName, setLastEnteredName}
}

