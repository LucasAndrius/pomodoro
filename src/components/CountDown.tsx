import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CountDown.module.css'

let countdownTimeout: NodeJS.Timeout;




export function CountDown(){

    const {startNewChallange} = useContext(ChallengesContext);
    

    const [time, setTime] = useState(0.1 * 60);
    const[isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60); 
    const seconds = time % 60;

    const [minuteLeft, minuteRight ] = String(minutes).padStart(2, '0').split('');
    const [secondsLeft, secondsRight ] = String(seconds).padStart(2, '0').split('');


    function startCountdown(){
        setIsActive(true)
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout); //impede que o timer reduza um segundo apos parar a aplicação
        setIsActive(false)
        setTime(0.1 * 60)
    }

    useEffect (()=> {
       if(isActive && time > 0){
        countdownTimeout = setTimeout( ()=> {
               setTime(time -1);
           }, 1000)
       } else if (isActive && time === 0) {
        setHasFinished(true);
        setIsActive(false);
        startNewChallange();
       }
    },[isActive,time])

    return (
        <div>
            <div className={styles.countDownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>

                <span>:</span>

                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>


            {hasFinished ? (
                <button 
                    disabled
                    className={styles.countDownButton }
                >
                    Ciclo Encerrado
                
                </button>
                ) : (

                <>
                    {isActive ? (

                        <button 
                            type="button"
                            className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
                            onClick={resetCountdown}
                        >
                        Abandonar Ciclo
                        </button>
                    
                        ) : (

                        <button 
                            type="button"
                            className={styles.countDownButton}
                            onClick={startCountdown}
                        >
                        Iniciar Ciclo
                        </button>

                        
                    )}
                </>
            )}

            
            
        </div>
        
    );
}