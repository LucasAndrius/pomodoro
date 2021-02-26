import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';



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
    closeLevelUpModal:() => void;
    
}

interface ChallengesProviderProps{
    children: ReactNode;
    level:number;
    currentExperience:number;
    challengesCompleted:number;
}



export const ChallengesContext = createContext( {} as challengesContextDate );


export function ChallengesProvier({
    children,
    ...rest
    
}:ChallengesProviderProps){

    const   [level, setLevel] = useState(rest.level ?? 1);
    const   [currentExperience,  setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const   [challengesCompleted, setChallangesCompleted] = useState(rest.challengesCompleted ?? 0);


    const [activeChallenge, setActiveChallenge] = useState(null)

    const [ isLevelUpModalOpen, setIsLevelModalOpen ] = useState(false);

    const experienceToNextLevel = Math.pow((level +1) * 4, 2)


    useEffect(() => { 
        Notification.requestPermission();
    },[]);


    useEffect(() =>{

        Cookies.set('level', String(level)); //seta os dados nos cookies
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    }, [level, currentExperience, challengesCompleted]);


    function levelUp(){
        setLevel(level + 1)
        setIsLevelModalOpen(true);
    }

    function closeLevelUpModal(){
        setIsLevelModalOpen(false);
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
                    completedChallenge,
                    closeLevelUpModal
                }
            }>

            {children}
            { isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    );
}


