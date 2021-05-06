import { useRef, useContext } from "react";
import SigninButton from "./SubmitButton";
import { SigninContext } from "../../contexts/SigninContext";

export default function SigninInput() {
    const { checkIfTokenExists, tokenValidity } = useContext(SigninContext);
    const inputRef = useRef();

    function onKeyPress(key) {
        return key === "Enter"
            ? checkIfTokenExists(inputRef.current.value)
            : null;
    }

    return (
        <>
            <div className="input-wrapper">
                <input
                    type="text"
                    placeholder="Place your token here"
                    onKeyPress={({ key }) => onKeyPress(key)}
                    ref={inputRef}
                    required
                />
                <span className="token-validity">Invalid token</span>
            </div>
            <SigninButton inputRef={inputRef} />
            <style jsx>
                {`
                    .input-wrapper input {
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
                    .input-wrapper input::placeholder {
                        color: var(--font-color);
                        font-weight: 400;
                    }
                    .input-wrapper input:focus-within {
                        box-shadow: var(--input-focus-highlight);
                    }
                    .token-validity {
                        margin-top: 0.5rem;
                        text-align: center;
                        font-size: 1.2rem;
                        font-weight: bold;
                        color: hsl(0, 80%, 60%);
                    }
                `}
            </style>
            <style jsx>
                {`
                    .token-validity {
                        display: ${tokenValidity ? "none" : "block"};
                    }
                `}
            </style>
        </>
    );
}
