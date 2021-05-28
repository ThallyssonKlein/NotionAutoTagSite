export default function SubmitButton({ token, checkIfTokenIsValid }) {
    return (
        <>
            <button type="button" onClick={() => checkIfTokenIsValid(token)}>
                Log in
            </button>
            <style jsx>{`
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
                @media only screen and (max-width: 333px) {
                    button {
                        margin-top: 1rem;
                    }
                }
            `}</style>
        </>
    );
}
