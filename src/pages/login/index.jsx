/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import Modal from 'react-modal';
import { TailSpin } from 'react-loader-spinner';
import GlobalStyles from '../../components/GlobalStyles';
import TextInput from './TextInput';

export default function SignIn() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <GlobalStyles>
      <Modal
        isOpen={modalIsOpen}
        contentLabel="Example Modal"
        className="modal"
        centered
      >
        <div className="modalcontainer">
          <TailSpin color="#00BFFF" height={80} width={80} />
        </div>
      </Modal>
      <main>
        <div className="content">
          <div className="main-text-wrapper">
            <h1>
              Got your token? Great.
              <br />
              Paste it below to log in:
            </h1>
          </div>
          <div className="token-wrapper">
            <TextInput setModalIsOpen={setModalIsOpen}/>
          </div>
        </div>
      </main>
      <style jsx>
        {`
                    main {
                        padding: 2rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                    }
                    .content {
                        display: grid;
                        grid-template: repeat(3, min-content) / 1fr;

                        box-shadow: var(--outside-box-shadow);
                        border-radius: var(--border-radius);
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
                        gap: 1rem;
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
