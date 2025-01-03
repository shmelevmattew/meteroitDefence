import React, {useEffect, useState} from 'react';
import HyperModal, {ModalStack} from 'react-hyper-modal';
import {Button} from "./Button";
import {inspect} from "util";
import styles from "../styles/HelperModal.module.css"
import {meteoriteSetting} from "../consts/settings";
import {getByName, getScores, TableRow} from "../api/service/score";
import {useLastEnteredName} from "../hooks/useLastEnteredName";
export const HelperModal = ({displayButtons = true,lastEnteredName = "",shouldUpdate = false}) => {
    const [index, setIndex] = useState(-1)
    const [leadersModal,setLeadersModal] = useState(false)
    const [scores,setScores] = useState<TableRow[]>([])
    const [userUpdated,setUserUpdated] = useState(true)
    function openLeadersModal(){
        setLeadersModal(true)
        if(userUpdated){
                if(lastEnteredName.length > 0 && scores.length > 0){
                    let flag = false
                    getByName(lastEnteredName).then((res)=>{
                        let index = 0
                        let placeIndex = 0
                        for (let place in scores){
                            index++
                            console.log(scores[place].name  + " " +lastEnteredName)

                            if (scores[place].name == lastEnteredName){
                                flag = true
                                console.log(flag)
                                // @ts-ignore
                                console.log(res[0])
                            }
                        }
                        if (!flag){
                            console.log("not found")
                            setScores((prev)=>{
                                console.log("new arr")
                                const newArr = [...prev,...res]
                                return [...prev,...res]
                            })
                        }
                        setUserUpdated(false)
                    })

                }
        }
    }

    useEffect(()=>{
        getScores().then((res)=>{
            setScores(res.slice(0,10))
        }).then(
            ()=>setUserUpdated(true)
        )
    },[lastEnteredName,shouldUpdate])

    return (
        <>
            <HyperModal
                classes={{
                    contentClassName: 'modal-content',
                    wrapperClassName:styles.modal,
                    portalWrapperClassName:styles.modal
                }}
                stackable
                stackableIndex={index}
                unmountOnClose

                beforeClose={()=>{
                    setIndex(-1)
                }}
                renderOpenButton={(requestOpen) => {
                    return (
                        <div className={styles.buttonWrapper}>
                            {
                                displayButtons &&
                                <>
                                    <Button

                                        onClick={()=>{
                                            setIndex(0)
                                            requestOpen()
                                        }}
                                    >
                                        ?
                                    </Button>
                                    <Button
                                        onClick={openLeadersModal}
                                    >
                                        Лидеры
                                    </Button>
                                </>
                            }
                        </div>
                    )
                }}
                stackContentSettings={{
                    widthRatio:100
                }}
                renderCloseIcon={()=>(<></>)}
            >
                {props => (
                    <ModalStack {...props}>
                        <div className={styles.dialog}>
                            <div color={styles.text}>Привет, я динозавр Гена. <br/> ДА ДИНОЗАВР И У МЕНЯ НЕТ <br/> ВОЛОСАТОГО КОМПАНЬЙОНА  <br/> ГУМАНОДНОЙ ФОРМЫ !! <br/> Вообщем я к чему веду </div>
                            <Button
                                className={styles.button}
                                onClick={() => setIndex(1)}
                            >
                                слушать дальше
                            </Button>
                        </div>
                        <div className={styles.dialog}>
                            <div color={styles.text}>Моя планета находится в опасности <br/> тебе придется ее спасти <br/> почему тебе я не знаю <br/> никогда не было ощущения будто это все ненастроящее?</div>
                            <Button
                                className={styles.button}
                                onClick={() => setIndex(2)}
                            >
                                слушать дальше
                            </Button>
                        </div>
                        <div className={styles.dialog}>
                            <div color={styles.text}><br/> будто мы застряли в матрице <br/> будто угроза нереальна, а все это разработка студента <br/>И угроза была создана спецально, лишь бы какой-то ученик сдал лабораторную</div>
                            <Button
                                className={styles.button}
                                onClick={() => setIndex(3)}
                            >
                                Далее
                            </Button>
                        </div>
                        <div className={styles.dialog}>
                            <div color={styles.text}>мне кажется я начал что-то понима... [звуки помех] <br/> О чем это я , вот правила...</div>
                            <Button
                                className={styles.button}
                                onClick={() => setIndex(4)}
                            >
                               Узнать правила
                            </Button>
                        </div>
                        <div className={styles.dialog}>
                            <div color={styles.text}>Тебе нужно уничтожать метеориты левым кликом мыши <br/> если ты не успеешь и метеорит коснется земли - проиграл <br/> уничтожение метеоритов приносит очки</div>
                            <Button
                                className={styles.button}
                                onClick={() => setIndex(5)}
                            >
                                Слушаю тебя
                            </Button>
                        </div>
                        <div className={styles.dialog}>
                            <div color={styles.text}>Маленький метеорит треубет {meteoriteSetting["small"].clicksRequired} кликов для остановки и приносит {meteoriteSetting["small"].score} очков </div>
                            <Button
                                className={styles.button}
                                onClick={() => setIndex(6)}
                            >
                                А большой?
                            </Button>
                        </div>
                        <div className={styles.dialog}>
                            <div color={styles.text}>Большой метеорит треубет {meteoriteSetting["large"].clicksRequired} кликов для остановки и приносит {meteoriteSetting["large"].score} очков </div>
                            <Button
                                className={styles.button}
                                onClick={() => setIndex(7)}
                            >
                                А может бонусные будут?
                            </Button>
                        </div>
                        <div className={styles.dialog}>
                            <div color={styles.text}>Да, без бонусов была бы скука полная <br/> Бонусный метеорит очень быстрый треубет {meteoriteSetting["bonus"].clicksRequired} кликов для остановки и приносит {meteoriteSetting["bonus"].score} очков <br/> Однако он не закончит игру в случае если коснется земли</div>
                            <Button
                                className={styles.button}
                                onClick={() => setIndex(8)}
                            >
                                Ну, все понятно
                            </Button>
                        </div>
                        <div className={styles.dialog}>
                            <div color={styles.text}>Ах, да, чуть не забыл<br/> У нас динозавров строгая бухгалтерия <br/> Так что очки засчитываются только по факту остановки метеорита</div>
                            <Button
                                className={styles.button}
                                onClick={() => setIndex(9)}
                            >
                                Ну, теперь точно понятно
                            </Button>
                        </div>

                        <div className={styles.dialog}>
                            <div color={styles.text}>Ну и вешай парашуты вовремя, если повесить их прямо у  земли, то метеорит просто не успеет остановиться <br/> Всё всё, теперь точно можешь идти</div>
                            <Button
                                className={styles.button}
                                onClick={() => props.handleClose()}
                            >
                                ...
                            </Button>
                        </div>
                    </ModalStack>
                )}
            </HyperModal>
            { index >= 0 && <img src={require('../assets/dinosaur.png')} className={styles.dino}/>}
            <HyperModal
                isOpen={leadersModal}
                requestClose={()=>setLeadersModal(false)}
                classes={{wrapperClassName:styles.modal,portalWrapperClassName:styles.modal}}
                renderCloseIcon={()=>(<></>)}
            >
                <div className={styles.scroll}>
                    <ol className={styles.list}>
                        {
                            scores?.map((el,index)=>{
                                console.log(el)
                                return (

                                        <li className={styles.row} key={index}>

                                            <div className={styles.name}>{el.name}</div>
                                            <div className={styles.dots}></div>
                                            <div className={styles.score}>{el.score}</div>
                                        </li>
                                )
                            })
                        }
                    </ol>

                </div>
            </HyperModal>
        </>
    );
}
