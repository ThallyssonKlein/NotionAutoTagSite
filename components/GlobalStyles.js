export default function GlobalStyles({ children }) {
    return (
        <>
            {children}
            <style jsx global>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap");
                    * {
                        padding: 0;
                        margin: 0;
                        border: 0;
                        box-sizing: border-box;
                    }
                    :root {
                        font-size: 62.5%;
                    }
                    label,
                    h1,
                    input,
                    button,
                    p,
                    li,
                    span {
                        font-family: Roboto;
                    }
                    li {
                        list-style-type: none;
                    }
                    main {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        width: 100vw;
                        background-color: hsl(230, 14%, 9%);
                    }
                `}
            </style>
        </>
    );
}
