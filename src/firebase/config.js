import firebase from "firebase/app";
import "firebase/firestore";

//auth
import "firebase/auth";

  const process_prefix = process.env;
  const apiKey = process_prefix.REACT_APP_apiKey;
  const authDomain = process_prefix.REACT_APP_authDomain;
  const projectId = process_prefix.REACT_APP_projectId;
  const storageBucket = process_prefix.REACT_APP_storageBucket;
  const messagingSenderId = process_prefix.REACT_APP_messagingSenderId;
  const appId = process_prefix.REACT_APP_appId;



const firebaseConfig = {
  apiKey: {apiKey},
  authDomain: {authDomain},
  projectId: {projectId},
  storageBucket: {storageBucket},
  messagingSenderId: {messagingSenderId},
  appId: {appId},
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
