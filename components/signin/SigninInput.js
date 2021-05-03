import { useRef, useContext } from "react";
import SigninButton from "./SigninButton";
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
                        max-width: 34.5rem;
                        border-radius: 1rem;
                        padding: 1rem;
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
