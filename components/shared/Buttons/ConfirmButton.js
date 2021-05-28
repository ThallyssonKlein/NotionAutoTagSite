export default function CancelButton({ text, value, setValue }) {
    return (
        <>
            <button type="button" onClick={() => setValue(value)}>
                {text}
            </button>
            <style jsx>{`
                button {
                    height: 3rem;
                    border-radius: 0.3rem;
                    padding: 0rem 1rem;
                    font-size: 1.8rem;
                    color: white;
                    cursor: pointer;
                    transition: background 0.2s ease;
                    font-weight: 500;
                    background-color: var(--button-background-color);
                    box-shadow: var(--outside-box-shadow);
                    border: 0.1rem solid var(--button-2-border-color);
                }
                button:hover {
                    background-color: var(--hovered-buton-background-color);
                }
            `}</style>
        </>
    );
}
