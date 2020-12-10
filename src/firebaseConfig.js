import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "BOPKK7HEzs4nH96KOW2CUzGLIcbg5DF3Vkvrr4jTQ29fwQ0icfLoOmWX7puEBmVhnVPOiNttedJzEguMO3xto5s",
  authDomain: "chataja-frontend-test-b9c9b.firebaseapp.com",
  databaseURL: "https://chataja-frontend-test-b9c9b-default-rtdb.firebaseio.com/",
  projectId: "chataja-frontend-test-b9c9b",
  storageBucket: "gs://chataja-frontend-test-b9c9b.appspot.com/",
  messagingSenderId: "840496592743",
  appId: "1:840496592743:web:b169fb239e58dc43d161c2"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);