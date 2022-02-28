/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
export default function GlobalStyles({ children }) {
  return (
    <>
      {children}
      <style jsx global>
        {`
                    * {
                        padding: 0;
                        margin: 0;
                        border: 0;
                        box-sizing: border-box;
                    }
                    :root {
                        font-size: 62.5%;

                        --background-color: #2f3437;
                        --complementary-background-color: #373c3f;
                        --complementary-background-color-2: #3f4447;
                        --complementary-background-color-3: #494e50;

                        --font-color: #ffffff99;
                        --highlighted-font-color: #ffffffe6;

                        --content-text-font-size: clamp(1.5rem, 1vw, 2.5rem);

                        --confirm-button-background-color: #2eaadc;
                        --hovered-confirm-button-background-color: #069cff;

                        --cancel-button-background-color: transparent;
                        --hovered-cancel-button-background-color: #474c50;
                        --cancel-button-border-color: #ffffff24;

                        --remove-button-background-color: transparent;
                        --hovered-remove-button-background-color: ;
                        --remove-button-border-color: #eb575780;

                        --outside-box-shadow: 0 0 0 0.1rem #0f0f0f33,
                            0 0.2rem 0.4rem #0f0f0f33;
                        --inside-box-shadow: inset 0 0 0 0.1rem #0f0f0f33;

                        --input-background: #0f0f0f4d;
                        --input-focus-highlight: inset 0 0 0 0.1rem #2eaadcb3,
                            0 0 0 0.2rem #2eaadc66;

                        --text-selection-background-color: #2f5669;

                        --text-error-color: #eb5757;

                        --success-color: #AFE1AF;

                        --anchor-color: #2eaadc;
                        --hovered-anchor-color: #3094b0;

                        --border-radius: 0.3rem;
                    }
                    label,
                    h1,
                    h2,
                    input,
                    button,
                    p,
                    li,
                    span,
                    a {
                        font-family: -apple-system, BlinkMacSystemFont,
                            "Segoe UI", Helvetica, "Apple Color Emoji", Arial,
                            sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
                    }
                    label::selection,
                    h1::selection,
                    input::selection,
                    button::selection,
                    p::selection,
                    li::selection,
                    span::selection,
                    br::selection,
                    a::selection,
                    h2::selection {
                        background-color: var(
                            --text-selection-background-color
                        );
                    }
                    li {
                        list-style-type: none;
                    }
                    input[type="text"],
                    input[type="email"] {
                        outline: none;
                    }
                    #__next {
                        width: 100vw;
                        height: 100vh;
                        background-color: var(--background-color);
                    }
                `}
      </style>
    </>
  );
}
