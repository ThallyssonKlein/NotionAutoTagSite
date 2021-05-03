import firebase from "firebase/app";
import "firebase/firestore";
import config from "./firestoreConfig";

const firestore = {
    get connect() {
        // if firebase hasn't been initialized yet, then do so
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        const db = firebase.firestore();

        return db;
    },
};

export default firestore;
