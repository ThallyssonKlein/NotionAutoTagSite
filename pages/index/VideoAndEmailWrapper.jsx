/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line react/prop-types
export default function VideoAndEmailWrapper({ children }) {
  return (
    <>
      <div className="wrapper">{children}</div>
      <style jsx>
        {`
                    .wrapper {
                        box-shadow: var(--outside-box-shadow);
                        border-radius: var(--border-radius);
                        overflow: hidden;
                    }
                `}
      </style>
    </>
  );
}
