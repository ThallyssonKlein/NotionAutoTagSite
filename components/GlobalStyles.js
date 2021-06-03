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

                        --highlighted-font-color: #ffffffe6;
                        --font-color: #ffffff99;

                        --content-text-font-size: clamp(1.5rem, 1vw, 2.5rem);

                        --button-background-color: #2eaadc;
                        --hovered-buton-background-color: #069cff;

                        --button-background-color-2: transparent;
                        --hovered-button-background-color-2: #474c50;
                        --button-2-border-color: #ffffff24;

                        --outside-box-shadow: 0px 0px 0px 1px
                                rgba(15, 15, 15, 0.2),
                            0px 2px 4px rgba(15, 15, 15, 0.2);
                        --inside-box-shadow: inset 0px 0px 0px 1px
                            rgba(15, 15, 15, 0.2);

                        --input-background: #0f0f0f4d;
                        --input-focus-highlight: inset 0px 0px 0px 1px
                                rgba(46, 170, 220, 0.7),
                            0px 0px 0px 2px rgba(46, 170, 220, 0.4);

                        --text-selection-background-color: #2f5669;

                        --error-color: #eb5757;

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
                    a::selection {
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
