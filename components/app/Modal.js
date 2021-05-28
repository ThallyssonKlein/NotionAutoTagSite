import { useState } from "react";
import TokenInstructions from "./TokenInstructions";
import firestore from "../../utils/firestore";
import ConfirmButton from "../shared/Buttons/ConfirmButton";
import CancelButton from "../shared/Buttons/CancelButton";
import ErrorMessage from "./ErrorMessage";

export default function Modal({ modalValue, setModalValue, setSavedToken }) {
    const [accordion, setAccordion] = useState(false);
    const [tokenValidity, setTokenValidity] = useState(true);
    const [inputToken, setInputToken] = useState("");

    function checkToken(token) {
        if (token.length === 156) {
            return token;
        }
    }

    async function saveToken(token) {
        // check if token is valid
        if (!checkToken(token)) {
            return setTokenValidity(false);
        }

        const collection = await firestore.connect()
            .collection("authorizations")
            .get();

        collection.forEach(async (doc) => {
            // if token already registered, show error message
            if (doc.get("token_v2") === inputToken) {
                setTokenValidity(false);
                return;
            }

            // if database contains the user email, then save the token based on user email
            if (doc.get("email")) {
                setTokenValidity(true);
                const leadData = doc.data();
                const leadCollection = firestore.connect()
                    .collection("authorizations")
                    .doc(doc.ref.id);

                await leadCollection.set({
                    ...leadData,
                    token_v2: token,
                });

                setSavedToken(!setSavedToken);
                setTimeout(() => setSavedToken(false), 2000);
            } else {
                console.log("There was an error");
                return;
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
                            value={inputToken}
                            onChange={({ target }) =>
                                setInputToken(target.value)
                            }
                            onKeyPress={({ key }) =>
                                key === "Enter" ? saveToken(inputToken) : null
                            }
                        />
                        {!tokenValidity && (
                            <ErrorMessage text="Invalid token. Check if it has no spaces." />
                        )}
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
                            onKeyPress={({ key }) => {
                                if (key === "Enter") setAccordion(!accordion);
                            }}
                        >
                            How to get your Notion token?
                        </p>
                    </div>
                    <div className="buttons">
                        <div className="close-button">
                            <CancelButton
                                value={modalValue}
                                setValue={setModalValue}
                            />
                        </div>
                        <div className="save-button">
                            <ConfirmButton
                                text="Save"
                                value={inputToken}
                                setValue={saveToken}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={`instructions ${accordion ? "unfold" : "fold"}`}
                >
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
                    .token-input-wrapper input:focus {
                        box-shadow: var(--input-focus-highlight);
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
                        flex: 1 1 50%;
                        transition: 0.2s ease;
                    }
                    .how-to:hover {
                        background-color: var(
                            --hovered-button-background-color-2
                        );
                        padding: 0.5rem;
                        border-radius: 0.3rem;
                    }
                    .how-to svg {
                        margin-top: 0.3rem;
                        height: min-content;
                        margin-right: 0.8rem;
                        flex: 0 0 1.2rem;
                        transition: 0.4s ease;
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
                        column-gap: 1rem;
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
                    }
                    .instructions {
                        max-height: 0;
                    }
                    .instructions.unfold {
                        animation: 1s ease forwards unfold;
                    }
                    .instructions.fold {
                        animation: 1s ease forwards fold;
                    }
                    @keyframes unfold {
                        from {
                            max-height: 0;
                        }
                        to {
                            max-height: 20rem;
                        }
                    }
                    @keyframes fold {
                        from {
                            max-height: 20rem;
                        }
                        to {
                            max-height: 0;
                        }
                    }
                `}
            </style>
            <style jsx>
                {`
                    .how-to svg {
                        transform: ${accordion
                            ? "rotateZ(90deg)"
                            : "rotateZ(0deg)"};
                    }
                `}
            </style>
        </>
    );
}
