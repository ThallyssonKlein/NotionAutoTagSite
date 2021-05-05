import { useContext, createRef } from "react";
import {
    FirestoreProvider,
    FirestoreMutation,
} from "@react-firebase/firestore";
import firebase from "firebase/app";
import "firebase/firestore";
import { EmailContext } from "../contexts/EmailContext";
import SubmitButton from "./SubmitButton";
import config from "../utils/firestoreConfig";

export default function TextInput() {
    const { ValidateAndSubmit } = useContext(EmailContext);
    const collectionPath = "leads";
    const inputRef = createRef();

    function onKeyPress(key, runMutation) {
        if (key === "Enter") {
            ValidateAndSubmit(inputRef.current.value, runMutation);
            inputRef.current.value = ""
        }
    }

    return (
        <FirestoreProvider {...config} firebase={firebase}>
            <FirestoreMutation path={collectionPath} type="add">
                {({ runMutation }) => (
                    <>
                        <input
                            type="email"
                            placeholder="Type your e-mail to receive early access to the product"
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
                )}
            </FirestoreMutation>
        </FirestoreProvider>
    );
}
