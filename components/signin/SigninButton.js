import { useContext } from "react";
import { SigninContext } from "../../contexts/SigninContext";

export default function SigninButton() {
    const { checkIfTokenExists } = useContext(SigninContext);

    return (
        <>
            <div className="button-wrapper">
                <button onClick={() => checkIfTokenExists()}>Sign in</button>
            </div>
            <style jsx>{`
                .button-wrapper button {
                    border-radius: 1rem;
                    padding: 0.6rem 1rem;
                    background-color: hsl(193, 57%, 54%);
                    font-size: 2rem;
                    color: white;
                    margin-left: 1rem;
                    cursor: pointer;
                    transition: background 0.2s ease;
                }
                .button-wrapper button:hover {
                    background-color: hsl(193, 57%, 34%);
                }
            `}</style>
        </>
    );
}
