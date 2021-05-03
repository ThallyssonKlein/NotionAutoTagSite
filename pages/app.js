import { useState } from "react";
import Gear from "../components/app/GearIcon";
import Modal from "../components/app/Modal";
import TokenSaved from "../components/app/TokenSaved";
import GlobalStyles from "../components/GlobalStyles";

export default function App() {
    const [modal, setModal] = useState(false);
    const [savedToken, setSavedToken] = useState(false);

    return (
        <GlobalStyles>
            <main>
                <div className="content">
                    <div className="config">
                        <Gear setModal={setModal} modal={modal} />
                    </div>
                    <div
                        className="modal-wrapper"
                        onClick={(e) => {
                            const target = [...e.target.classList];

                            if (target.includes("modal-wrapper")) {
                                setModal(false);
                            }
                        }}
                        aria-hidden="true"
                    >
                        <Modal
                            setModal={setModal}
                            setSavedToken={setSavedToken}
                        />
                    </div>
                    {savedToken && <TokenSaved />}
                </div>
            </main>
            <style jsx>
                {`
                    .content {
                        display: grid;
                        grid-template: repeat(2, 1fr) / 1fr;
                    }
                    .modal-wrapper {
                        width: 100vw;
                        height: 100%;
                        background-color: hsla(0, 0%, 0%, 0.6);
                        position: absolute;
                        top: 0;
                        left: 0;
                        justify-content: center;
                        align-items: center;
                    }
                `}
            </style>
            <style jsx>
                {`
                    .content .modal-wrapper {
                        display: ${modal ? "flex" : "none"};
                    }
                `}
            </style>
        </GlobalStyles>
    );
}
