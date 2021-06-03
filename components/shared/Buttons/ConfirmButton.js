export default function CancelButton({ type, text, value, setValue }) {
    return (
        <>
            <button type={type ?? "button"} onClick={() => setValue(value)}>
                {text}
            </button>
            <style jsx>{`
                button {
                    height: 3rem;
                    border-radius: var(--border-radius);
                    padding: 0rem 1rem;
                    font-size: var(--content-text-font-size);
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
