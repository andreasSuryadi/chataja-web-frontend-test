import firebase from 'firebase/app'
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBdz-pVqe_8B5LMlZy7lIZFAye86mMl734",
  authDomain: "chataja-web-frontend-test.firebaseapp.com",
  databaseURL: "https://chataja-web-frontend-test-default-rtdb.firebaseio.com",
  projectId: "chataja-web-frontend-test",
  storageBucket: "chataja-web-frontend-test.appspot.com",
  messagingSenderId: "973217452386",
  appId: "1:973217452386:web:eeffb69da8ca8fc9055c3b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();