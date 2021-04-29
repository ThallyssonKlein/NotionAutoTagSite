import { useContext, createRef } from "react";
import {
    FirestoreProvider,
    FirestoreMutation,
} from "@react-firebase/firestore";
import "firebase/firestore";
import firebase from "firebase/app";
import { EmailContext } from "../contexts/EmailContext";
import SubmitButton from "./SubmitButton";

const config = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

export default function TextInput() {
    const { ValidateAndSubmit } = useContext(EmailContext);
    const collectionPath = "leads";
    const inputRef = createRef();

    function onKeyPress(key, runMutation) {
        if (key === "Enter") {
            ValidateAndSubmit(inputRef.current.value, runMutation);
            inputRef.current.value = "";
        }
    }

    return (
        <FirestoreProvider {...config} firebase={firebase}>
            <FirestoreMutation path={collectionPath} type="add">
                {({ runMutation }) => {
                    return (
                        <>
                            <input
                                type="email"
                                placeholder={
                                    "Type your e-mail to receive early access to the product"
                                }
                                onKeyPress={(event) => {
                                    onKeyPress(event.key, runMutation);
                                }}
                                ref={inputRef}
                            />
                            <SubmitButton
                                runMutation={runMutation}
                                inputRef={inputRef}
                            />
                            <style jsx>
                                {`
                                    input[type="email"] {
                                        max-width: 34.5rem;
                                        border-radius: 1rem;
                                        padding: 1rem;
                                        flex: 1;
                                    }
                                `}
                            </style>
                        </>
                    );
                }}
            </FirestoreMutation>
        </FirestoreProvider>
    );
}
