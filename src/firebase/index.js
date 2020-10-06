import * as firebase from 'firebase/app';
import 'firebase/firestore';


const app = firebase.initializeApp({
    apiKey: "AIzaSyAqLwmYw-G0dvhS6h0MALoqqVMn-LyWc8A",
    authDomain: "alexshoppyfire.firebaseapp.com",
    databaseURL: "https://alexshoppyfire.firebaseio.com",
    projectId: "alexshoppyfire",
    storageBucket: "alexshoppyfire.appspot.com",
    messagingSenderId: "425618486243",
    appId: "1:425618486243:web:2b1320b55f236f22b566d6",
    measurementId: "G-C9B94M7LMP"
});

export function getFirebase(){
    return app;
}

export function getFirestore(){
    return firebase.firestore(app);
}
