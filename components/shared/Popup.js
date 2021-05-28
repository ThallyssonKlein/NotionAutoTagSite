import { useEffect, useState } from "react";

export default function Popup({ text, show, setShow }) {
    const [popupDisplay, setPopupDisplay] = useState(true);

    useEffect(() => {
        setPopupDisplay(show);
        setTimeout(() => {
            setPopupDisplay(false);
            setShow(false);
        }, 5000);
    }, []);

    return (
        <>
            <div className="saved-popup">
                <p>{text}</p>
            </div>
            <style jsx>
                {`
                    .saved-popup {
                        position: absolute;
                        bottom: 2rem;
                        left: 2rem;
                        box-shadow: var(--inside-box-shadow),
                            var(--outside-box-shadow);
                        background-color: var(--background-color);
                        border-radius: 0.4rem;
                    }
                    .saved-popup p {
                        color: hsl(0, 0%, 84%);
                        font-size: 1.5rem;
                        font-weight: bold;
                        padding: 1rem 2rem;
                    }
                `}
            </style>
            <style jsx>{`
                .saved-popup {
                    display: ${popupDisplay ? "block" : "none"};
                }
            `}</style>
        </>
    );
}
