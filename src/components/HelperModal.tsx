import React, {useState} from 'react';
import HyperModal, {ModalStack} from 'react-hyper-modal';
import {Button} from "./Button";
import {inspect} from "util";
import styles from "../styles/HelperModal.module.css"
import {meteoriteSetting} from "../consts/settings";
export const HelperModal = () => {
    const [index, setIndex] = useState(-1)
    return (
        <>
            <HyperModal
                classes={{
                    contentClassName: 'modal-content',
                }}
                stackable
                stackableIndex={index}
                unmountOnClose
                beforeClose={()=>{
                    setIndex(-1)
                }}
                renderOpenButton={(requestOpen) => {
                    return (
                        <Button
                            onClick={()=>{
                                setIndex(0)
                                requestOpen()
                            }}
                        >
                        </Button>
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
                            <div color={styles.text}>Маленький метеорит треубет {meteoriteSetting["small"].clicksRequired} кликов для уничтожения и приносит {meteoriteSetting["small"].score} очков </div>
                            <Button
                                className={styles.button}
                                onClick={() => setIndex(6)}
                            >
                                А большой?
                            </Button>
                        </div>
                        <div className={styles.dialog}>
                            <div color={styles.text}>Большой метеорит треубет {meteoriteSetting["large"].clicksRequired} кликов для уничтожения и приносит {meteoriteSetting["large"].score} очков </div>
                            <Button
                                className={styles.button}
                                onClick={() => setIndex(7)}
                            >
                                А может бонусные будут?
                            </Button>
                        </div>
                        <div className={styles.dialog}>
                            <div color={styles.text}>Да, без бонусов была бы скука полная <br/> Бонусный метеорит очень быстрый треубет {meteoriteSetting["bonus"].clicksRequired} кликов для уничтожения и приносит {meteoriteSetting["large"].score} очков <br/> Однако он не закончит игру в случае если коснется земли</div>
                            <Button
                                className={styles.button}
                                onClick={() => props.handleClose()}
                            >
                                Ну, все понятно
                            </Button>
                        </div>
                    </ModalStack>
                )}
            </HyperModal>
            { index >= 0 && <img src={require('../assets/dinosaur.png')} className={styles.dino}/>}
        </>
    );
}
