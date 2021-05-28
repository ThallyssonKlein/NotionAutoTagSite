export default function ErrorMessage({ text }) {
    return (
        <>
            <span>{text}</span>
            <style jsx>{`
                span {
                    display: block;
                    text-align: center;
                    margin-top: 1rem;
                    font-size: 1.2rem;
                    color: var(--error-color);
                }
            `}</style>
        </>
    );
}
