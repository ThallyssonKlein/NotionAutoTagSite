/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line react/prop-types
export default function CancelButton({ value, setValue }) {
  return (
    <>
      <button type="button" onClick={() => setValue(!value)}>
        Cancel
      </button>
      <style jsx>
        {`
                button {
                    user-select: none;
                    height: 3rem;
                    border-radius: var(--border-radius);
                    padding: 0rem 1rem;
                    font-size: var(--content-text-font-size);
                    color: var(--text-error-color);
                    cursor: pointer;
                    transition: background 0.2s ease;
                    font-weight: 400;
                    background-color: var(--cancel-button-background-color);
                    border: 0.1rem solid var(--cancel-button-border-color);
                }
                button:hover {
                    background-color: var(
                        --hovered-cancel-button-background-color
                    );
                }
            `}

      </style>
    </>
  );
}
