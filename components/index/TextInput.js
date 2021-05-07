import { useContext, createRef } from "react";
import {
    FirestoreProvider,
    FirestoreMutation,
} from "@react-firebase/firestore";
import "firebase/firestore";
import firebase from "firebase/app";
import { EmailContext } from "../../contexts/EmailContext";
import SubmitButton from "./SubmitButton";
import config from "../../utils/firestoreConfig";

export default function TextInput() {
    const { ValidateAndSubmit } = useContext(EmailContext);
    const collectionPath = "authorizations";
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
                                input {
                                    max-width: 35rem;
                                    height: 3rem;
                                    border-radius: 0.3rem;
                                    padding: 0.4rem 1rem;
                                    flex: 1;
                                    background-color: var(--input-background);
                                    color: var(--highlighted-font-color);
                                    font-weight: 500;
                                    box-shadow: var(--inside-box-shadow);
                                }
                                input::placeholder {
                                    color: var(--font-color);
                                    font-weight: 400;
                                }
                                input:focus {
                                    box-shadow: var(--input-focus-highlight);
                                }
                            `}
                        </style>
                    </>
                )}
            </FirestoreMutation>
        </FirestoreProvider>
    );
}
