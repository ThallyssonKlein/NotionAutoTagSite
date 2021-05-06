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
                        <svg
                            width="60"
                            height="52"
                            viewBox="0 0 60 52"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M60 26L0 51.9808V0.0192375L60 26Z"
                                fill="#C4C4C4"
                            />
                        </svg>
                        <p
                            tabIndex="0"
                            onKeyPress={({ key }) =>
                                key === "Enter"
                                    ? setAccordion(!accordion)
                                    : null
                            }
                        >
                            How to get your Notion token?
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
                        background-color: var(--background-color);
                        width: 80vw;
                        max-width: 50rem;
                        height: min-content;
                        border-radius: 0.3rem;
                        box-shadow: var(--outside-box-shadow);
                        overflow: hidden;
                    }
                    .container {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        border-bottom: 0.1rem solid rgba(255, 255, 255, 0.1);
                        padding: 1rem;
                    }
                    .main-text-wrapper h1 {
                        font-weight: bold;
                        font-size: 2rem;
                        text-align: center;
                        color: hsl(0, 0%, 84%);
                    }
                    .token-input-wrapper {
                        margin-top: 1rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    }
                    .token-input-wrapper input {
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
                    .token-input-wrapper input::placeholder {
                        color: var(--font-color);
                        font-weight: 400;
                    }
                    .confirm-config {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        align-items: center;
                        padding: 1rem;
                        background-color: var(
                            --complementary-background-color-2
                        );
                    }
                    .how-to {
                        display: flex;
                        align-items: center;
                        flex: 1;
                    }
                    .how-to:hover {
                        background-color: var(
                            --hovered-button-background-color-2
                        );
                        padding: 0.5rem;
                        border-radius: 0.3rem;
                    }
                    .how-to {
                        flex: 1 1 50%;
                    }
                    .how-to svg {
                        height: min-content;
                        margin-right: 0.8rem;
                        flex: 0 0 1.2rem;
                    }
                    .how-to p {
                        flex: 1 0 12.5rem;
                        display: inline-block;
                        font-size: 1.5rem;
                        color: var(--highlighted-font-color);
                        cursor: pointer;
                        position: relative;
                    }
                    .buttons {
                        justify-content: flex-end;
                        display: flex;
                        flex: 1;
                    }
                    .buttons button {
                        height: 3rem;
                        border-radius: 0.3rem;
                        padding: 0rem 1rem;
                        font-size: 1.8rem;
                        font-weight: 500;
                        color: white;
                        cursor: pointer;
                        transition: background 0.2s ease;
                        margin-left: 1rem;
                    }
                    .close-button button {
                        font-weight: 400;
                        background-color: transparent;
                        transition: 0.2s ease;
                        border: 0.1rem solid var(--button-2-border-color);
                    }
                    .close-button button:hover {
                        background-color: var(
                            --hovered-button-background-color-2
                        );
                    }
                    .save-button button {
                        background-color: var(--button-background-color);
                        box-shadow: var(--outside-box-shadow);
                        transition: 0.2s ease;
                    }
                    .save-button button:hover {
                        background-color: var(--hovered-buton-background-color);
                    }
                    .instructions {
                        grid-column: 1 / 3;
                    }
                    @media only screen and (max-width: 382px) {
                        .how-to {
                            order: 1;
                            justify-content: center;
                            margin-top: 1rem;
                        }
                        .how-to p {
                            flex: initial;
                        }
                        .confirm-config {
                            flex-direction: column;
                        }
                        .buttons {
                            width: 100%;
                            justify-content: space-between;
                        }
                        .buttons button {
                            margin-left: initial;
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
            <style jsx>
                {`
                    .how-to svg {
                        transform: ${accordion
                            ? "rotate(90deg)"
                            : "rotate(360deg)"};
                    }
                `}
            </style>
        </>
    );
}
