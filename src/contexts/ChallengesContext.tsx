import { createContext, useState, ReactNode } from 'react';
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

    function levelUp(){
        setLevel(level + 1)
    }


    function startNewChallange(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
    }


    function resetChallenge(){
        setActiveChallenge(null);
    }

    return (
        
        <ChallengesContext.Provider 
            value={
                {
                    level,
                    currentExperience,
                    challengesCompleted,
                    levelUp,
                    startNewChallange,
                    activeChallenge,
                    resetChallenge,
                    experienceToNextLevel
                }
            }>

            {children}
        </ChallengesContext.Provider>
    );
}


