import SigninContextProvider from "../contexts/SigninContext";
import GlobalStyles from "../components/GlobalStyles";
import SigninInput from "../components/signin/SigninInput";

export default function SignIn() {
    return (
        <GlobalStyles>
            <main>
                <div className="content">
                    <div className="main-text-wrapper">
                        <h1>
                            Got your token? Great.
                            <br />
                            Paste it below to sign in:
                        </h1>
                    </div>
                    <div className="token-wrapper">
                        <SigninContextProvider>
                            <SigninInput />
                        </SigninContextProvider>
                    </div>
                </div>
            </main>
            <style jsx>
                {`
                    .content {
                        display: grid;
                        grid-template: repeat(3, min-content) / 1fr;
                        gap: 2rem;
                    }
                    .main-text-wrapper h1 {
                        color: white;
                        font-size: clamp(2rem, 2vw, 4rem);
                        text-align: center;
                    }
                    .token-wrapper {
                        display: flex;
                        justify-content: center;
                    }
                `}
            </style>
        </GlobalStyles>
    );
}
