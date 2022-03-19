/* eslint-disable react/react-in-jsx-scope */
export default function Header() {
  return (
    <>
      <header>
        <div className="title">
          <h1>Notion Auto Tag</h1>
        </div>
      </header>
      <style jsx>
        {`
                .title {
                    padding: 1rem;
                }
                .title h1 {
                    text-align: center;
                }

                header {
                    display: none;
                }
            `}

      </style>
    </>
  );
}
