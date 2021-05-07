export default function VideoAndEmailWrapper({ children }) {
    return (
        <>
            <div className="wrapper">{children}</div>
            <style jsx>
                {`
                    .wrapper {
                        box-shadow: var(--outside-box-shadow);
                        border-radius: 0.3rem;
                        overflow: hidden;
                    }
                `}
            </style>
        </>
    );
}
