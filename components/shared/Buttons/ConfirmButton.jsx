/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
export default function CancelButton({
  // eslint-disable-next-line react/prop-types
  type, text, value, setValue,
}) {
  return (
    <>
      <button type={type ?? 'button'} onClick={() => setValue(value)}>
        {text}
      </button>
      <style jsx>
        {`
                button {
                    user-select: none;
                    height: 3rem;
                    border-radius: var(--border-radius);
                    padding: 0rem 1rem;
                    font-size: var(--content-text-font-size);
                    color: white;
                    cursor: pointer;
                    transition: background 0.2s ease;
                    font-weight: 500;
                    background-color: var(--confirm-button-background-color);
                    box-shadow: var(--outside-box-shadow);
                }
                button:hover {
                    background-color: var(--hovered-confirm-button-background-color);
                }
            `}

      </style>
    </>
  );
}
