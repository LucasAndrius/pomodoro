import Head from 'next/head';
import {GetServerSideProps} from 'next';

import { CompletedChellenges } from '../components/CompletedChallenges';
import { CountDown } from '../components/CountDown';
import { ExperienceBar } from "../components/ExpecienceBar";
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';


import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvier } from '../contexts/ChallengesContext';


interface HomeProps{
  level:number;
  currentExperience:number;
  challengesCompleted:number;
}

export default function Home(props:HomeProps) {

  console.log(props);

  return (
    <ChallengesProvier 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      >


      <div className={styles.container}>
        <Head>
          <title>Inicio | Pomodoro</title>
        </Head>
        <ExperienceBar/>

        <CountdownProvider>
            <section>
              <div>
                <Profile />
                 <CompletedChellenges/>
                <CountDown/>
              </div>
              <div>
              <ChallengeBox/>
                </div>
                <div>
                  A Técnica Pomodoro é um método de gerenciamento de tempo desenvolvido
                  por Francesco Cirillo no final dos anos 1980. A técnica consiste na
                  utilização de um cronômetro para dividir o trabalho em períodos de 25 minutos,
                  separados por breves intervalos. A técnica deriva seu nome da palavra italiana 
                  pomodoro (tomate), como referência ao popular cronômetro gastronômico na
                  forma dessa fruta. O método é baseado na ideia de que pausas frequentes
                  podem aumentar a agilidade mental.<br/>
                  <a href="https://pt.wikipedia.org/wiki/T%C3%A9cnica_pomodoro" target="_blank">Wikpédia</a>
                </div>
            </section>
          </CountdownProvider>
      </div>
    </ChallengesProvier>
    
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) =>{

  const {level,currentExperience,challengesCompleted} = ctx.req.cookies;

  //console.log(user);

  return{
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(level),
    }
  }
}