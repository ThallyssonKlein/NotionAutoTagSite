/* eslint-disable react/react-in-jsx-scope */
import GlobalStyles from '../components/GlobalStyles';
import TextInput from './index/TextInput';
import VideoAndEmailWrapper from './index/VideoAndEmailWrapper';

export default function Home() {
  return (
    <GlobalStyles>
      <main>
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
