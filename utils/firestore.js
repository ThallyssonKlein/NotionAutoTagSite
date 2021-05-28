import firebase from "firebase/app";
import "firebase/firestore";
import config from "./firestoreConfig";

const firestore = {
    connect() {
        // if firebase hasn't been initialized yet, then do so
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        const db = firebase.firestore();

        return db;
    },
    async save(path, value) {
        try {
            const db = this.connect();
            const collection = await db.collection(path).get();
            const documents = collection.docs;
            const objKey = Object.keys(value)[0];
            const objValue = Object.values(value)[0];
            
            if (documents.length > 0) {
                const fieldExists = documents.some(
                    (doc) => doc.get(objKey) === objValue
                );

                if (fieldExists) {
                    return false;
                }

                await this.connect().collection(path).add(value);
            }

            await this.connect().collection(path).add(value);

            return true;
        } catch (err) {
            console.error(
                "There was an error while trying to save to databse: " + err
            );
            return false;
        }
    },
};

export default firestore;
