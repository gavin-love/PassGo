import firebase from 'firebase/app';
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyAq7qtEOqlGptS7iG4szeRe3YkHjzcBS04",
  authDomain: "pass-go.firebaseapp.com",
  databaseURL: "https://pass-go.firebaseio.com",
  projectId: "pass-go",
  storageBucket: "pass-go.appspot.com",
  messagingSenderId: "45026019754"
};

if(!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
}