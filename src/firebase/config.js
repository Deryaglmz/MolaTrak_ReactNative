// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Firebase Config is from a web app project
// FOR KEEPING YOUR CONFIG IN A .env FILE
const apiKey = process.env.EXPO_PUBLIC_API_KEY
const authDomain = process.env.EXPO_PUBLIC_AUTH_DOMAIN
const databaseURL= process.env.EXPO_PUBLIC_DATABASE_URL
const projectId = process.env.EXPO_PUBLIC_PROJECT_ID
const storageBucket= process.env.EXPO_PUBLIC_STORAGE_BUCKET
const messagingSenderId= process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID
const appId= process.env.EXPO_PUBLIC_APP_ID
const measurementId = process.env.EXPO_PUBLIC_MEASUREMENT_ID

// ADD YOUR FIREBASE WEB APP CONFIG DATA BELOW

const firebaseConfig = {
  apiKey: apiKey, // 'api-key',
  authDomain: authDomain, // 'project-id.firebaseapp.com',
  databaseURL: databaseURL, //'https://project-id.firebaseio.com',
  projectId: projectId, //'project-id',
  storageBucket: storageBucket,// 'project-id.appspot.com',
  messagingSenderId: messagingSenderId, //'sender-id',
  appId: appId, // 'app-id',
  measurementId: measurementId //'G-measurement-id',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
const db = getFirestore(app);

export { app , auth, db }