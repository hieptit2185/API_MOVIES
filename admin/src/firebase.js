// import firebase from "firebase"
// import { initializeApp } from 'firebase/app'

// const firebaseConfig = {
//   apiKey: process.env.APP_KEY,
//   authDomain: "netflix-151df.firebaseapp.com",
//   projectId: "netflix-151df",
//   storageBucket: "netflix-151df.appspot.com",
//   messagingSenderId: "316700975498",
//   appId: "1:316700975498:web:15063159b205c1a349a873",
//   measurementId: "G-2ZGE63ES9F",
// };

// firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage()
// export default storage;

import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCBg3Ua0ctANTv50_I9kLisI0Gkct9kHHI",
    authDomain: "uploading-d8a4e.firebaseapp.com",
    projectId: "uploading-d8a4e",
    storageBucket: "uploading-d8a4e.appspot.com",
    messagingSenderId: "857615683105",
    appId: "1:857615683105:web:4a43a2fe1557a7d42c9d60"
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)