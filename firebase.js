
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCh3OZXPKzQO2wYYA8ZZpRxEgPIY2FwkIo",
    authDomain: "quiz-react-native-cw.firebaseapp.com",
    projectId: "quiz-react-native-cw",
    storageBucket: "quiz-react-native-cw.appspot.com",
    messagingSenderId: "467895483224",
    appId: "1:467895483224:web:f7efaf60c6ece48950c32d"
};
let app;

if(firebase.apps.length === 0 ) {
    app = firebase.initializeApp(firebaseConfig)
}else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db,auth};
