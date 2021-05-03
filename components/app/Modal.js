import { useRef, useState } from "react";
import TokenInstructions from "./TokenInstructions";
import firestore from "../../utils/firestore";

export default function Modal({ setModal, setSavedToken }) {
    const [accordion, setAccordion] = useState(false);
    const [validity, setValidity] = useState(true);
    const inputRef = useRef();

    function checkToken(token) {
        if (token.length === 156) {
            return token;
        }
    }

    async function saveToken(token) {
        if (!checkToken(token)) {
            return setValidity(false);
        }

        const collection = await firestore.connect
            .collection("authorizations")
            .get();

        collection.forEach(async (doc) => {
            if (doc.get("email")) {
                setValidity(true);
                const leadData = doc.data();
                const leadCollection = firestore.connect
                    .collection("authorizations")
                    .doc(doc.ref.id);

                await leadCollection.set({
                    ...leadData,
                    token_v2: token,
                });

                setSavedToken(true);
                setTimeout(() => setSavedToken(false), 2000);
            } else {
                return console.log("There was an error");
            }
        });
    }

    return (
        <>
            <article className="modal">
                <div className="container">
                    <div className="main-text-wrapper">
                        <h1>
                            In order to pull your tables from Notion, we need to
                            get access to your Notion token.
                        </h1>
                    </div>
                    <div className="token-input-wrapper">
                        <input
                            type="text"
                            placeholder="Paste your token here"
                            ref={inputRef}
                            onKeyPress={({ key }) =>
                                key === "Enter"
                                    ? saveToken(inputRef.current.value)
                                    : null
                            }
                        />
                        <span>Invalid token. Check if it has no spaces.</span>
                    </div>
                </div>
                <div className="confirm-config">
                    <div
                        className="how-to"
                        onClick={() => setAccordion(!accordion)}
                        aria-hidden="true"
                    >
                        <p
                            tabIndex="0"
                            onKeyPress={({ key }) =>
                                key === "Enter"
                                    ? setAccordion(!accordion)
                                    : null
                            }
                        >
                            How to get your Notion <wbr/>token?
                        </p>
                    </div>
                    <div className="buttons">
                        <div className="close-button">
                            <button
                                type="button"
                                onClick={() => setModal(false)}
                            >
                                Close
                            </button>
                        </div>
                        <div className="save-button">
                            <button
                                type="button"
                                onClick={() =>
                                    saveToken(inputRef.current.value)
                                }
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                <div className="instructions">
                    <TokenInstructions />
                </div>
            </article>
            <style jsx>
                {`
                    .modal {
                        background-color: hsl(210, 5%, 17%);
                        width: 80vw;
                        max-width: 50rem;
                        height: min-content;
                        padding: 2rem;
                        border-radius: 0.4rem;
                    }
                    .container {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        background-color: hsl(220, 10%, 11%);
                        border-radius: 0.4rem;
                        padding: 2rem;
                        box-shadow: inset 0 0.1rem 0.4rem hsla(0, 0%, 0%, 0.25);
                    }
                    .main-text-wrapper h1 {
                        font-family: Roboto;
                        font-weight: bold;
                        font-size: 2rem;
                        text-align: center;
                        color: hsl(0, 0%, 84%);
                    }
                    .token-input-wrapper {
                        margin-top: 2rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    }
                    .token-input-wrapper input {
                        border-radius: 0.4rem;
                        padding: 0.5rem 1rem;
                        font-size: 1.5rem;
                        width: 100%;
                        max-width: 20rem;
                    }
                    .confirm-config {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 2rem;
                    }
                    .how-to {
                        display: flex;
                        align-items: center;
                        min-width: 11rem;
                        flex: 1;
                        margin-right: 2rem;
                    }
                    .how-to p {
                        font-size: 1.5rem;
                        color: hsl(0, 0%, 84%);
                        cursor: pointer;
                    }
                    .how-to p::after {
                        content: url("/icons/arrow.svg");
                        margin-left: 0.5rem;
                    }
                    .confirm-config .buttons {
                        justify-content: flex-end;
                        display: flex;
                        flex: 1;
                    }
                    .confirm-config button {
                        padding: 0.5rem 1rem;
                        border-radius: 0.4rem;
                        font-size: 1.5rem;
                        font-weight: 500;
                        text-transform: uppercase;
                        text-align: center;
                        cursor: pointer;
                        width: 7rem;
                    }
                    .close-button {
                        margin-right: 2rem;
                    }
                    .close-button button {
                        color: hsl(0, 0%, 20%);
                        background-color: hsl(0, 0%, 84%);
                        transition: 0.4s ease;
                    }
                    .close-button button:hover {
                        color: hsl(0, 0%, 10%);
                        background-color: hsl(0, 0%, 64%);
                    }
                    .save-button button {
                        background-color: hsl(193, 57%, 54%);
                        color: hsl(193, 100%, 10%);
                        transition: 0.4s ease;
                    }
                    .save-button button:hover {
                        background-color: hsl(193, 57%, 40%);
                        color: hsl(193, 100%, 0%);
                    }
                    .instructions {
                        margin-top: 2rem;
                        grid-column: 1 / 3;
                    }
                    @media only screen and (max-width: 412px) {
                        .how-to {
                            order: 1;
                            margin-right: initial;
                            margin-top: 2rem;
                            display: flex;
                            justify-content: center;
                        }
                        .confirm-config .buttons {
                            order: 0;
                            justify-content: space-between;
                        }
                        .instructions {
                            margin-top: 1rem;
                        }
                    }
                `}
            </style>
            <style jsx>
                {`
                    .instructions {
                        display: ${accordion ? "block" : "none"};
                    }
                `}
            </style>
            <style jsx>
                {`
                    .token-input-wrapper span {
                        display: ${validity ? "none" : "block"};
                        text-align: center;
                        margin-top: 1rem;
                        font-size: 1.2rem;
                        color: hsl(0, 80%, 60%);
                    }
                `}
            </style>
        </>
    );
}
