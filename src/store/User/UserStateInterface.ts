import firebase from 'firebase';

export default interface UserStateInterface {
  loggedIn: boolean;
  data: null | firebase.User;
  points: {
    value: number;
    timestamp: firebase.firestore.Timestamp;
  };
}
