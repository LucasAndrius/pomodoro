import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';


interface Challenge {
    type:'body' | 'eye';
    description:string;
    amount:number;
}

interface challengesContextDate{
    level:number;
    currentExperience:number;
    challengesCompleted:number;
    experienceToNextLevel:number;
    activeChallenge:Challenge;
    levelUp:() => void;
    startNewChallange: () => void;
    resetChallenge:() => void;
    completedChallenge:()=> void;
    
}

interface ChallengesProvierProps{
    children:ReactNode;
}

export const ChallengesContext = createContext( {} as challengesContextDate );


export function ChallengesProvier({children}:ChallengesProvierProps){

    const   [level, setLevel] = useState(1);
    const   [currentExperience,  setCurrentExperience] = useState(0);
    const   [challengesCompleted, setChallangesCompleted] = useState(0);


    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level +1) * 4, 2)


    useEffect(() => { 
        Notification.requestPermission();
    },[])


    function levelUp(){
        setLevel(level + 1)
    }


    function startNewChallange(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted') {
            new Notification('Novo Desafio 🥳',{
                body:` Valendo ${challenge.amount} xp!`
            })
        }
    }


    function resetChallenge(){
        setActiveChallenge(null);
    }


    function completedChallenge(){ 
        if(!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience > experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallangesCompleted(challengesCompleted+1);
    }


    return (
        
        <ChallengesContext.Provider  //contexto / regras
            value={
                {
                    level,
                    currentExperience,
                    challengesCompleted,
                    levelUp,
                    startNewChallange,
                    activeChallenge,
                    resetChallenge,
                    experienceToNextLevel,
                    completedChallenge
                }
            }>

            {children}
        </ChallengesContext.Provider>
    );
}


