import { useState } from "react";
import "firebase/firestore";
import firestore from "../../utils/firestore";
import Popup from "../shared/Popup";

export default function TextInput() {
    const [email, setEmail] = useState("");
    const [popUp, setPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    async function Submit(email) {
        const emailWasSaved = await firestore.save("users", { email });
        if (emailWasSaved) {
            setPopup(true);
            setPopupMessage("✔️ Your e-mail was successfuly saved!");
        } else {
            setPopup(true);
            setPopupMessage(
                "❌ There was an error while saving your e-mail. Try again."
            );
        }
    }

    function validateEmail(email) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function ValidateAndSubmit(email) {
        if (validateEmail(email)) {
            Submit(email);
        } else {
            setPopup(true);
            setPopupMessage("❌ Please, type a valid e-mail.");
        }
    }

    return (
        <>
            <input
                type="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                onKeyPress={({ key }) =>
                    key === "Enter" ? ValidateAndSubmit(email) : null
                }
                placeholder="Type your e-mail to receive early access to the product"
            />
            <button type="button" onClick={() => ValidateAndSubmit(email)}>
                Submit
            </button>
            {popUp && (
                <Popup text={popupMessage} show={popUp} setShow={setPopup} />
            )}
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
                    button {
                        height: 3rem;
                        border-radius: 0.3rem;
                        padding: 0rem 1rem;
                        background-color: var(--button-background-color);
                        box-shadow: var(--outside-box-shadow);
                        font-size: 1.8rem;
                        font-weight: 500;
                        color: white;
                        margin-left: 1rem;
                        flex: 0.1;
                        cursor: pointer;
                        transition: background 0.2s ease;
                    }
                    button:hover {
                        background-color: var(--hovered-buton-background-color);
                    }
                    @media only screen and (max-width: 335px) {
                        button {
                            margin-top: 1rem;
                        }
                    }
                `}
            </style>
        </>
    );
}
