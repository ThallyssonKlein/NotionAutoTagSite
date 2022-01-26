export default function RemoveButton({ onClick }) {
    return (
        <>
            <button type="button" onClick={onClick}>
                Remove
            </button>
            <style jsx>{`
                button {
                    user-select: none;
                    height: 3rem;
                    border-radius: var(--border-radius);
                    padding: 0rem 1rem;
                    font-size: var(--content-text-font-size);
                    color: rgb(235, 87, 87);;
                    cursor: pointer;
                    transition: background 0.2s ease;
                    background-color: var(--remove-button-background-color);
                    border: 0.1rem solid var(--remove-button-border-color);
                }
                button:hover {
                    background-color: var(
                        --hovered-remove-button-background-color
                    );
                }
            `}</style>
        </>
    );
}
