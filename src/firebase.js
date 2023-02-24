// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCQFw0lPYuqAx3YBD3oO8fpECQaRKnDlOU',
  authDomain: 'todo-app-eb418.firebaseapp.com',
  projectId: 'todo-app-eb418',
  storageBucket: 'todo-app-eb418.appspot.com',
  messagingSenderId: '557579141790',
  appId: '1:557579141790:web:1882cf4634ddff92e8318f',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
