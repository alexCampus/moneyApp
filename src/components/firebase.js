import Firebase from 'firebase';

const firebaseApp = Firebase.initializeApp({
  	apiKey: "AIzaSyDkbH7yrVsgZ5eEZPMzx9htZTT6o_o5S7Q",
    authDomain: "moneyapp-ec342.firebaseapp.com",
    databaseURL: "https://moneyapp-ec342.firebaseio.com",
    projectId: "moneyapp-ec342",
    storageBucket: "moneyapp-ec342.appspot.com",
    messagingSenderId: "320345538792"
});

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();
