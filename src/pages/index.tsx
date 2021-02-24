import Head from 'next/head';

import { CompletedChellenges } from '../components/CompletedChallenges';
import { CountDown } from '../components/CountDown';
import { ExperienceBar } from "../components/ExpecienceBar";
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';


import styles from '../styles/pages/Home.module.css';



export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio | Pomodoro</title>
      </Head>
      <ExperienceBar/>
      <section>
        <div>
          <Profile />
          <CompletedChellenges/>
          <CountDown/>
        </div>
        <div>
          <ChallengeBox/>
        </div>
      </section>
    </div>
  )
}
