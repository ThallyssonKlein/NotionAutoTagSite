import { createContext, useState } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/firestore";

const config = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

export const SigninContext = createContext();

export default function SigninContextProvider({ children }) {
    const [tokenValidity, setTokenValidity] = useState(true);

    const router = useRouter();

    async function checkIfTokenExists(token) {
        // if firebase hasn't been initialized yet, then do so
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        const db = firebase.firestore();

        const collection = await db.collection("authorizations").get();

        collection.forEach((doc) => {
            if (doc.get("token") === token) {
                localStorage.setItem("email", doc.data().email);

                setTokenValidity(true);

                router.push("/app");
            } else {
                setTokenValidity(false);
            }
        });
    }

    return (
        <SigninContext.Provider
            value={{ checkIfTokenExists, tokenValidity }}
        >
            {children}
        </SigninContext.Provider>
    );
}
