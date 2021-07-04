// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAzfYZbiGAZXfqgCNSv4Td4icZUvL7m_FU",
    authDomain: "whatsapp-clone-7708.firebaseapp.com",
    projectId: "whatsapp-clone-7708",
    storageBucket: "whatsapp-clone-7708.appspot.com",
    messagingSenderId: "808277465978",
    appId: "1:808277465978:web:754a43fc7b0764e29e94c3",
    measurementId: "G-KC4GR3EDV4"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;