import { getAuth } from 'firebase/auth';

import firebaseApp from './config';

const firebaseAuth = getAuth(firebaseApp);

export default firebaseAuth;
