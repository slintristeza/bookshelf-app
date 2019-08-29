import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'API_KEY',
    authDomain: 'APP_ID.firebaseapp.com',
    databaseURL: 'https://PROJECT_ID.firebaseio.com',
    projectId: 'PROJECT_ID',
    storageBucket: 'PROJECT_ID.appspot.com',
    messagingSenderId: '1234567890'
  })
}

export default firebase
