export default function TokenInstructions() {
    return (
        <>
            <ol>
                <li>
                    Go to
                    {" "}
                    <a
                        href="http://www.notion.so"
                        target="_blank"
                        rel="noreferrer"
                    >
                        www.notion.so
                    </a>
                    {" "}
                    and log in into your account
                </li>
                <li>
                    Click on the little lock by your browser's search bar, then
                    click on Cookies
                </li>
                <li>
                    Click on cookies and unfold "www.notion.so", then unfold the
                    folder "Cookies"
                </li>
                <li>
                    Now find your "token_v2" and copy the value from "Content"
                </li>
            </ol>
            <style jsx>
                {`
                    ol {
                        padding: 1rem;
                    }
                    li {
                        list-style-type: decimal;
                        list-style-position: inside;
                        font-size: 1.6rem;
                        margin-top: 0.5rem;
                        color: hsl(0, 0%, 84%);
                    }
                    a {
                        text-decoration: none;
                        color: hsl(193, 57%, 54%);
                    }
                    a:hover {
                        color: hsl(193, 57%, 44%);
                    }
                `}
            </style>
        </>
    );
}
