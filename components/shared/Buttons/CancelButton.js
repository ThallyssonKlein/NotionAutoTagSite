export default function CancelButton({ value, setValue }) {
    return (
        <>
            <button type="button" onClick={() => setValue(!value)}>
                Cancel
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
                    font-weight: 400;
                    background-color: transparent;
                    border: 0.1rem solid var(--button-2-border-color);
                }
                button:hover {
                    background-color: var(--hovered-button-background-color-2);
                }
            `}</style>
        </>
    );
}
