import SigninContextProvider from "../contexts/SigninContext";
import GlobalStyles from "../components/GlobalStyles";
import TextInput from "../components/login/TextInput";

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
                            <TextInput />
                        </SigninContextProvider>
                    </div>
                </div>
            </main>
            <style jsx>
                {`
                    main {
                        padding: 2rem;
                    }
                    .content {
                        display: grid;
                        grid-template: repeat(3, min-content) / 1fr;

                        box-shadow: var(--outside-box-shadow);
                        border-radius: 0.3rem;
                        overflow: hidden;
                    }
                    .main-text-wrapper {
                        padding: 1rem;
                    }
                    .main-text-wrapper h1 {
                        color: white;
                        font-size: clamp(2rem, 2vw, 4rem);
                        text-align: center;
                    }
                    .token-wrapper {
                        display: flex;
                        justify-content: center;
                        flex-wrap: wrap;

                        background-color: var(
                            --complementary-background-color-2
                        );
                        padding: 1rem;
                    }
                `}
            </style>
        </GlobalStyles>
    );
}
