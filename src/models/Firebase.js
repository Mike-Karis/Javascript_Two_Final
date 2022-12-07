// Your web app's Firebase configuration
// alert('add your firebase config in models/Firebase.js');
/* eslint-disable */
// import firebase from "firebase/compat";
import firebase from "firebase/app";
import "firebase/database";
import 'firebase/auth';
import 'firebase/app';
import 'firebase/storage'
import 'firebase/firestore'
// import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAVkJ60TtSaUCEPiLm0yQyyrUmqGVf3Meo",
  authDomain: "javascript-2022-e8d81.firebaseapp.com",
  projectId: "javascript-2022-e8d81",
  storageBucket: "javascript-2022-e8d81.appspot.com",
  messagingSenderId: "77587254976",
  appId: "1:77587254976:web:f684c64b7095cede66a725"
};

firebase.initializeApp(firebaseConfig);

// Create references to firestore and storage
const db = firebase.firestore();
const storage = firebase.storage().ref();

//db.collection('sampleUsers')

export default firebase
