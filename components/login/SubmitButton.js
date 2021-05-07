import { useContext } from "react";
import { SigninContext } from "../../contexts/SigninContext";

export default function SigninButton({ inputRef }) {
    const { checkIfTokenExists } = useContext(SigninContext);

    return (
        <>
            <div className="button-wrapper">
                <button
                    type="button"
                    onClick={() => checkIfTokenExists(inputRef.current.value)}
                >
                    Sign in
                </button>
            </div>
            <style jsx>
                {`
                    .button-wrapper button {
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
                    .button-wrapper button:hover {
                        background-color: var(--hovered-buton-background-color);
                    }
                    @media only screen and (max-width: 333px) {
                        .button-wrapper button {
                            margin-top: 1rem;
                        }
                    }
                `}
            </style>
        </>
    );
}
