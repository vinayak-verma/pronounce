import firebase from "firebase";
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCA8dx0DVEorOKkOu6zD4KFBu_u7vshTZk",
    authDomain: "namehub-d7807.firebaseapp.com",
    databaseURL: "https://namehub-d7807.firebaseio.com",
    projectId: "namehub-d7807",
    storageBucket: "namehub-d7807.appspot.com",
    messagingSenderId: "906995448555"
  };
  firebase.initializeApp(config);
var provider = new firebase.auth.GoogleAuthProvider();
var storage = firebase.storage();
var auth = firebase.auth();
var firestore = firebase.firestore();
export {
  provider,
  storage,
  auth,
  firestore,
  }
