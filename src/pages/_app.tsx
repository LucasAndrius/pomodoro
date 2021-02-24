import '../styles/global.css';

import { ChallengesProvier } from '../contexts/ChallengesContext';


function MyApp({ Component, pageProps }) {


  return (
     <ChallengesProvier>
       <Component {...pageProps} />
     </ChallengesProvier>
      
    
    );
}

export default MyApp
