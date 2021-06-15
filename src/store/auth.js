import {reactive} from 'vue'
import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyDTqiAwlxibrr96rUJyk53ADVQ8C2ZSgZQ",
    authDomain: "nuevacalculadorajs.firebaseapp.com",
    databaseURL: "https://nuevacalculadorajs-default-rtdb.firebaseio.com",
    projectId: "nuevacalculadorajs",
    storageBucket: "nuevacalculadorajs.appspot.com",
    messagingSenderId: "468631345062",
    appId: "1:468631345062:web:6c0d0cd9e43954f2cd6167",
    measurementId: "G-T6YSSD6N9M"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();

db.settings({timestampsInSnapshots: true});

const state = reactive({
    user: {},
    memory: {},
})


const signIn = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        state.user = cred.user;
    })
}


const logout = () => {
    auth.signOut().then(() => {
        state.user = null;
        state.memory = null;
    })
}

const login = (email, password) => {
    let memory = []
    auth.signInWithEmailAndPassword(email, password).then((data) => {
        state.user = data.user
        db.collection('users').doc(state.user.uid).collection('operaciones').get().then((queryResult) => {
            queryResult.forEach(doc => {
                memory.push(doc.data())
            })
            state.memory = memory
        }).catch(err => console.log(err))
    })
}


export default {
    state, signIn, login, logout
}

