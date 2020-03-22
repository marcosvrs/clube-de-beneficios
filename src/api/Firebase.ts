import firebase from 'firebase';
import firebaseConfig from '@/api/FirebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseDb = firebaseApp.firestore();

export default firebaseDb;
