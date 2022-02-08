import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAvBQljfrReVQac14GVo2WWcWkWoWJ84t0",
    authDomain: "todoist-a0165.firebaseapp.com",
    projectId: "todoist-a0165",
    storageBucket: "todoist-a0165.appspot.com",
    messagingSenderId: "911140121813",
    appId: "1:911140121813:web:7ad60c75b45f0007a1465c"
  };

const firebaseI = firebase.initializeApp(firebaseConfig);

export {firebaseI as firebase};