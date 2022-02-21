/* eslint-disable react/react-in-jsx-scope */
export default function ConnectWithNotion() {
  let parameters;

  if (process.env.NODE_ENV === 'development') {
    parameters = `client_id=${process.env.NEXT_PUBLIC_CLIENT_ID_DEV}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI_DEV}&response_type=code`;
  } else {
    parameters = `client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;
  }

  alert(parameters);

  return (
    <>
      <div className="container">
        <div className="message">
          <p>
            Things look a bit empty here. How about connecting to a
            database to get started?
          </p>
        </div>
        <div className="call-to-action">
          <a
            href={`https://api.notion.com/v1/oauth/authorize?${parameters}`}
          >
            Connect with Notion
          </a>
        </div>
      </div>
      <style jsx>
        {`
                  .container {
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                      row-gap: 1rem;
                  }
                  .message {
                      width: min(100%, 20rem);
                  }
                  .message p {
                      text-align: center;
                      color: var(--highlighted-font-color);
                      font-size: clamp(1.5rem, 1vw, 2.5rem);
                  }
                  .call-to-action a {
                      width: 100%;
                      display: flex;
                      padding: 1rem;
                      background-color: var(--confirm-button-background-color);
                      border-radius: var(--border-radius);
                      box-shadow: var(--outside-box-shadow),
                          var(--inside-box-shadow);
                      text-decoration: none;
                      text-align: center;
                      color: var(--highlighted-font-color);
                      font-size: clamp(1.5rem, 1vw, 2.5rem);
                      font-weight: bold;
                  }
                  .call-to-action a:hover {
                      background-color: var(--hovered-confirm-button-background-color);
                  }
              `}

      </style>
    </>
  );
}
