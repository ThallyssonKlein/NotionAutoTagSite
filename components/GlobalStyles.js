export default function GlobalStyles({ children }) {
    return (
        <>
            {children}
            <style jsx global>{`
                * {
                    padding: 0;
                    margin: 0;
                    border: 0;
                    box-sizing: border-box;
                }

                :root {
                    font-size: 62.5%;
                }

                a {
                    text-decoration: none;
                }

                main {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    width: 100vw;
                    background-color: #2c3334;
                }
            `}</style>
        </>
    );
}
