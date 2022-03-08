/* eslint-disable react/react-in-jsx-scope */
// react
import { useContext } from 'react';

// components
import GlobalStyles from '../components/GlobalStyles';
import TextInput from './index/TextInput';
import VideoAndEmailWrapper from './index/VideoAndEmailWrapper';

// external libs
// eslint-disable-next-line import/order
import Modal from 'react-modal';

// context
import { IndexPageContext } from '../contexts/IndexPageContext';

export default function Home() {
  const { modalIsOpen } = useContext(IndexPageContext);

  return (
    <GlobalStyles>
      <main>
        <Modal
          isOpen={modalIsOpen}
          contentLabel="Example Modal"
        >
          <h2>Loading...</h2>
        </Modal>

        <div className="content">
          <div className="main-text-wrapper">
            <h1>
              Imagine that your Notion collections create a life
              of their own and start to organize themselves, what
              do you think?
            </h1>
          </div>
          <VideoAndEmailWrapper>
            <div className="video-wrapper">
              <video
                src="/video/serviceShowcase.mp4"
                playsInline
                autoPlay
                muted
                loop
              />
            </div>
            <div className="email-input-wrapper">
              <TextInput />
            </div>
          </VideoAndEmailWrapper>
        </div>
      </main>
      <style jsx>
        {`
                    main {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        padding: 2rem;
                    }
                    .content {
                        display: grid;
                        grid-template: repeat(3, min-content) / 1fr;
                        gap: 2rem;
                        max-width: 80rem;
                        margin: 0 auto;
                    }
                    .main-text-wrapper h1 {
                        color: white;
                        font-size: clamp(2rem, 2vw, 4rem);
                        text-align: center;
                    }
                    .video-wrapper {
                        border-bottom: 0.1rem solid rgba(255, 255, 255, 0.1);
                    }
                    .video-wrapper video {
                        width: 100%;
                        border-radius: var(--border-radius);
                    }
                    .email-input-wrapper {
                        display: flex;
                        justify-content: center;
                        gap: 1rem;
                        flex-wrap: wrap;
                        padding: 1rem;
                        background-color: var(
                            --complementary-background-color-2
                        );
                    }
                `}
      </style>
    </GlobalStyles>
  );
}
