/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line react/prop-types
export default function InputError({ text }) {
  return (
    <>
      <span>{text}</span>
      <style jsx>
        {`
                span {
                    color: var(--text-error-color);
                    font-size: clamp(1.1rem, 0.5vw, 1.5rem);
                }
            `}

      </style>
    </>
  );
}
