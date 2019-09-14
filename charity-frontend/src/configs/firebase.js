import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDLYXgcOE8okLjfNJHr6sA5lA4QVrgGJLw",
  authDomain: "charity-e6df4.firebaseapp.com",
  databaseURL: "https://charity-e6df4.firebaseio.com",
  projectId: "charity-e6df4",
  storageBucket: "",
  messagingSenderId: "117142991199",
  appId: "1:117142991199:web:a271d359cc4307662d86ea"
};

firebase.initializeApp(config);

export default firebase;

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
