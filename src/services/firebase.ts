import * as firebase from "firebase";

// TODO: fill in your firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC4KBHsU2t0dStC0A85RwmGsiFexkPs9hE",
  authDomain: "remo-code-test.firebaseapp.com",
  databaseURL: "https://remo-code-test.firebaseio.com",
  projectId: "remo-code-test",
  storageBucket: "remo-code-test.appspot.com",
  messagingSenderId: "356357195193",
  appId: "1:356357195193:web:b4a97121e736e4c0cb6268",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
